import {Component, EventEmitter, HostListener, OnDestroy, OnInit, Output} from '@angular/core';
import * as d3 from 'd3';
import * as d3Scale from 'd3';
import * as d3Shape from 'd3';
import * as d3Array from 'd3';
import * as d3Axis from 'd3';
import {ApiService} from '../shared/api.service';
import {formatDate} from '@angular/common';

export interface ChartModel {
  value: number;
  date: Date;
}

const MAX_COUNT_LOAD = 2;

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnInit, OnDestroy {
  @Output() ready = new EventEmitter();
  data: ChartModel[] = [];
  showInfo = false;
  nameChartPair = '';
  dateRangeChat = '';
  profit = false;
  delta = 0;

  private countLoad = 0;
  private margin = {top: 15, right: 50, bottom: 75, left: 75};
  private width = 0;
  private height = 0;
  private x: any;
  private y: any;
  private svg: any;
  private line: d3Shape.Line<[number, number]> = d3Shape.line(); // this is line defination

  constructor(private currencyService: ApiService) {
  }

  private subs: any;

  ngOnInit(): void {
    this.subs = this.currencyService.needPaintGraph.subscribe((req) => {
        d3.selectAll('svg > *').remove();
        this.data.length = 0;
        this.countLoad = 0;
        this.showInfo = false;
        this.getChartData(req);
        this.showInfo = true;
      }
    );
    this.ready.emit();
  }

  private getChartData(data: { leftCur: string, rightCur: string }, date: Date = new Date()): void {
    if (this.countLoad === 0) {
      date.setDate(date.getDate() - (8 * MAX_COUNT_LOAD));
    }
    this.currencyService.getHistroyPair(data.leftCur, data.rightCur, date).subscribe((req) => {
      const reqData = req[data.leftCur + '_' + data.rightCur];
      for (const i in reqData) {
        this.data.push({date: new Date(i), value: reqData[i]});
      }
      this.countLoad++;
      if (this.countLoad <= MAX_COUNT_LOAD - 1) {
        date.setDate(date.getDate() + 9);
        this.getChartData(data, date);
      }
      this.nameChartPair = data.leftCur + ' / ' + data.rightCur;
      this.dateRangeChat = formatDate(this.data[0].date, 'yyyy-MM-dd', 'en-US') +
        ' - ' + formatDate(this.data[this.data.length - 1].date, 'yyyy-MM-dd', 'en-US');
      this.delta = this.data[this.data.length - 1].value - this.data[0].value;
      this.profit = this.data[this.data.length - 1].value > this.data[0].value;
      this.repaint();
    });
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  private resizeChart(): void {
    const widthNew = document.getElementById('chartArea')?.clientWidth;
    const heightNew = document.getElementById('chartArea')?.clientHeight;

    this.width = (widthNew !== undefined ? widthNew - this.margin.left - this.margin.right : 0);
    this.height = (heightNew !== undefined ? heightNew - this.margin.top - this.margin.bottom : 0);
  }

  @HostListener('window:resize') onWindowSResize(): void {
    this.repaint();
  }

  private repaint(): void {
    this.resizeChart();
    d3.selectAll('svg > *').remove();
    this.buildSvg();
    this.addXandYAxis();
    this.drawLineAndPath();
  }

  private buildSvg(): void {
    this.svg = d3.select('svg')
      .append('g')
      .attr('transform', 'translate(' + this.margin.left + ',' + this.margin.top + ')');
  }

  private addXandYAxis(): void {
    this.x = d3Scale.scaleTime().range([0, this.width]);
    this.x.domain(d3Array.extent(this.data, (d) => d.date));
    this.y = d3Scale.scaleLinear().range([this.height, 0]);
    this.y.domain(d3Array.extent(this.data, (d) => d.value));

    this.svg.append('g')
      .attr('transform', 'translate(0,' + this.height + ')')
      .call(d3Axis.axisBottom(this.x));
    this.svg.append('g')
      .attr('class', 'axis axis--y')
      .call(d3Axis.axisLeft(this.y));
  }

  private drawLineAndPath(): void {
    this.line = d3Shape.line()
      .x((d: any) => this.x(d.date))
      .y((d: any) => this.y(d.value));
    this.svg.append('path')
      .datum(this.data)
      .attr('class', 'line')
      .attr('d', this.line);
  }
}
