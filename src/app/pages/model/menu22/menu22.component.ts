import { Component, OnInit } from '@angular/core';

import * as d3 from 'd3';

@Component({
  selector: 'app-menu22',
  templateUrl: './menu22.component.html',
  styleUrls: ['./menu22.component.scss']
})
export class Menu22Component implements OnInit {

  constructor() { }

  links = [
    {source: 'Microsoft', target: 'Amazon', type: 'licensing'},
    {source: 'Microsoft', target: 'HTC', type: 'licensing'},
    {source: 'Samsung', target: 'Apple', type: 'suit'},
    {source: 'Motorola', target: 'Apple', type: 'suit'},
    {source: 'Nokia', target: 'Apple', type: 'resolved'},
    {source: 'HTC', target: 'Apple', type: 'suit'},
    {source: 'Kodak', target: 'Apple', type: 'suit'},
    {source: 'Microsoft', target: 'Barnes & Noble', type: 'suit'},
    {source: 'Microsoft', target: 'Foxconn', type: 'suit'},
    {source: 'Oracle', target: 'Google', type: 'suit'},
    {source: 'Apple', target: 'HTC', type: 'suit'},
    {source: 'Microsoft', target: 'Inventec', type: 'suit'},
    {source: 'Samsung', target: 'Kodak', type: 'resolved'},
    {source: 'LG', target: 'Kodak', type: 'resolved'},
    {source: 'RIM', target: 'Kodak', type: 'suit'},
    {source: 'Sony', target: 'LG', type: 'suit'},
    {source: 'Kodak', target: 'LG', type: 'resolved'},
    {source: 'Apple', target: 'Nokia', type: 'resolved'},
    {source: 'Qualcomm', target: 'Nokia', type: 'resolved'},
    {source: 'Apple', target: 'Motorola', type: 'suit'},
    {source: 'Microsoft', target: 'Motorola', type: 'suit'},
    {source: 'Motorola', target: 'Microsoft', type: 'suit'},
    {source: 'Huawei', target: 'ZTE', type: 'suit'},
    {source: 'Ericsson', target: 'ZTE', type: 'suit'},
    {source: 'Kodak', target: 'Samsung', type: 'resolved'},
    {source: 'Apple', target: 'Samsung', type: 'suit'},
    {source: 'Kodak', target: 'RIM', type: 'suit'},
    {source: 'Nokia', target: 'Qualcomm', type: 'suit'},
    {source: 'Google', target: 'Google', type: 'licensing'}
  ];


  ngOnInit(): void {
    this.getSvg();
  }

  getSvg(): void {
    const nodes = {};
    this.links.forEach( (link) => {
      link.source = nodes[link.source] || (nodes[link.source] = {name: link.source});
      link.target = nodes[link.target] || (nodes[link.target] = {name: link.target});
    });

    const width = 960;
    const height = 500;

    const force = d3.layout.force()
      .nodes(d3.values(nodes))
      .links(this.links)
      .size([width, height])
      .linkDistance(60)
      .charge(-300)
      .on('tick', () => {
        path.attr('d', this.linkArc);
        circle.attr('transform', this.transform);
        text.attr('transform', this.transform);
      })
      .start();

    const svg = d3.select('#model2').append('svg')
      .attr('width', '100%')
      .attr('height', height);

    const defs = svg.append('defs');

    const arrowMarker = defs.append('marker')
      .attr('id', 'arrow')
      .attr('markerUnits', 'strokeWidth')
      .attr('markerWidth', '12')
      .attr('markerHeight', '12')
      .attr('viewBox', '0 0 12 12')
      .attr('refX', '6')
      .attr('refY', '6')
      .attr('orient', 'auto');

    // 绘制曲线
    // var curve_path = "M20,70 T80,100 T160,80 T20,70";

    svg.append('defs').selectAll('marker')
      .data(['suit', 'licensing', 'resolved'])
      .enter().append('marker')
      .attr('id', d => d)
      .attr('viewBox', '0 -5 10 10')
      .attr('refX', 15)
      .attr('refY', -1.5)
      .attr('markerWidth', 6)
      .attr('markerHeight', 6)
      .attr('orient', 'auto')
      .append('path')
      .attr('d', 'M0,-5L10,0L0,5');

    const path = svg.append('g').selectAll('path')
      .data(force.links())
      .enter().append('path')
      .attr('class', (d) => 'link ' + d.type)
      .attr('marker-end', (d) => 'url(#' + d.type + ')' );

    const circle = svg.append('g').selectAll('circle')
      .data(force.nodes())
      .enter().append('circle')
      .attr('r', 4)
      .call(force.drag);

    const text = svg.append('g').selectAll('text')
      .data(force.nodes())
      .enter().append('text')
      .attr('x', 8)
      .attr('y', '.31em')
      .text((d) => d.name);

  }

  linkArc(d): any {
    if ( d.source !== d.target){
      const dx = d.target.x - d.source.x;
      const dy = d.target.y - d.source.y;
      const dr = Math.sqrt(dx * dx + dy * dy);
      // return 'M2,2 L10,6 L2,10 L6,6 L2,2';
      return 'M' + d.source.x + ',' + d.source.y + 'A' + dr + ',' + dr + ' 0 0,1 ' + d.target.x + ',' + d.target.y;
    }else{     // 此处为处理指向自身的边
      const x = d.source.x;
      const y = d.source.y;
      const x1 = x - 10;
      const x2 = x + 10;
      const y1 = y + 10;
      const y2 = y + 20;
      const curvePath = 'M' + x + ',' + y + ' T' + x1 + ',' + y1 + ' T' + x2 + ',' + y2 + ' T' + x + ',' + y;
      return curvePath;
    }

  }

  transform(d): any {
    return 'translate(' + d.x + ',' + d.y + ')';
  }

}
