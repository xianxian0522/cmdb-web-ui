import {AfterViewInit, Component, OnInit} from '@angular/core';

import * as d3 from 'd3';
import {BaseRepository} from '../../../share/services/base.repository';

@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.scss']
})
export class GraphComponent implements OnInit, AfterViewInit {
  constructor(private baseRepository: BaseRepository<any>) {
  }

  height = 600;
  links = [
    {source: 'Microsoft', target: 'Amazon', type: 'licensing'},
    {source: 'Microsoft', target: 'HTC', type: 'licensing'},
    {source: 'Samsung', target: 'Apple', type: 'suit'},
    {source: 'Motorola', target: 'Apple', type: 'suit'},
    {source: 'Nokia', target: 'Apple', type: 'resolved'},
    {source: 'HTC', target: 'Apple', type: 'suit'},
    {source: 'Kodak', target: 'Apple', type: 'suit'},
  ];
  types = Array.from(new Set(this.links.map(d => d.type)));
  // data = ({nodes: Array.from(new Set(this.links.flatMap(l => [l.source, l.target])), id => ({id})), links: this.links});
  // color = d3.scaleOrdinal(this.types, d3.schemeCategory10);
  data = {
    nodes: [
      {id: 'Microsoft'},
      {id: 'Amazon'},
      {id: 'HTC'},
      {id: 'Samsung'},
      {id: 'Apple'},
      {id: 'Motorola'},
      {id: 'Nokia'},
      {id: 'Kodak'},
    ],
    links: [
      {source: 'Microsoft', target: 'Amazon', type: 'licensing'},
      {source: 'Microsoft', target: 'HTC', type: 'licensing'},
      {source: 'Samsung', target: 'Apple', type: 'suit'},
      {source: 'Motorola', target: 'Apple', type: 'suit'},
      {source: 'Nokia', target: 'Apple', type: 'resolved'},
      {source: 'HTC', target: 'Apple', type: 'suit'},
      {source: 'Kodak', target: 'Apple', type: 'suit'},
    ]
  };

  ngOnInit(): void {
    // console.log(d3, 'd3');
    // d3.select('#model').append(this.chart);
    // this.dataEdges();
  }

  chart = () => {
    // const links = this.data.links.map(d => Object.create(d));
    // const nodes = this.data.nodes.map(d => Object.create(d));
    // const width = 750;
    // console.log(links, nodes, 'sss');
    // const simulation = d3.forceSimulation(nodes)
    //   .force('link', d3.forceLink(links).id(d => d.id))
    //   .force('charge', d3.forceManyBody().strength(-400))
    //   .force('x', d3.forceX())
    //   .force('y', d3.forceY());
    // console.log(simulation, 'sim');
    //
    // const svg = d3.create('svg')
    //   .attr('viewBox', [-width / 2, -this.height / 2, width, this.height])
    //   .style('font', '12px sans-serif');
    // console.log(svg, 'svg');
    //
    // svg.append('defs').selectAll('marker')
    //   .data(this.types)
    //   .join('marker')
    //   .attr('id', d => `arrow-${d}`)
    //   .attr('viewBox', '0 -5 10 10')
    //   .attr('refX', 15)
    //   .attr('refY', -0.5)
    //   .attr('markerWidth', 6)
    //   .attr('markerHeight', 6)
    //   .attr('orient', 'auto')
    //   .append('path')
    //   .attr('fill', this.color)
    //   .attr('d', 'M0,-5L10,0L0,5');
    //
    // const link = svg.append('g')
    //   .attr('fill', 'none')
    //   .attr('stroke-width', 1.5)
    //   .selectAll('path')
    //   .data(links)
    //   .join('path')
    //   .attr('stroke', d => this.color(d.type))
    //   .attr('marker-end', d => `url(${new URL(`#arrow-${d.type}`)})`);
    //
    // const node = svg.append('g')
    //   .attr('fill', 'currentColor')
    //   .attr('stroke-linecap', 'round')
    //   .attr('stroke-linejoin', 'round')
    //   .selectAll('g')
    //   .data(nodes)
    //   .join('g')
    //   .call(this.drag(simulation));
    //
    // node.append('circle')
    //   .attr('stroke', 'white')
    //   .attr('stroke-width', 1.5)
    //   .attr('r', 4);
    //
    // node.append('text')
    //   .attr('x', 8)
    //   .attr('y', '0.31em')
    //   .text(d => d.id)
    //   .clone(true).lower()
    //   .attr('fill', 'none')
    //   .attr('stroke', 'white')
    //   .attr('stroke-width', 3);
    //
    // simulation.on('tick', () => {
    //   link.attr('d', this.linkArc);
    //   node.attr('transform', d => `translate(${d.x},${d.y})`);
    // });
    //
    // // invalidation.then(() => simulation.stop());
    // simulation.stop();
    //
    // return svg.node();
  }
  linkArc(d): any {
    const r = Math.hypot(d.target.x - d.source.x, d.target.y - d.source.y);
    return `
    M${d.source.x},${d.source.y}
    A${r},${r} 0 0,1 ${d.target.x},${d.target.y}
  `;
  }

  drag = simulation => {

    function dragstarted(event, d): void {
      if (!event.active) {
        simulation.alphaTarget(0.3).restart();
      }
      d.fx = d.x;
      d.fy = d.y;
    }

    function dragged(event, d): void {
      d.fx = event.x;
      d.fy = event.y;
    }

    function dragended(event, d): void {
      if (!event.active) {
        simulation.alphaTarget(0);
      }
      d.fx = null;
      d.fy = null;
    }

    return d3.drag()
      .on('start', dragstarted)
      .on('drag', dragged)
      .on('end', dragended);
  }

  dataEdges(): void {
    // const h = 500;
    // const w = 750;
    // // ???????????? d3.schemeBlues[9]
    // const colors = d3.scaleOrdinal(d3.schemeCategory10); // ??????????????????????????????20????????????????????????
    // console.log(colors, 'colors');
    // const links = this.data.links.map(d => Object.create(d));
    // const nodes = this.data.nodes.map(d => Object.create(d));
    // const dataset = {
    //   nodes: [
    //     {id: 'Alice'},
    //     {id: 'Bob'},
    //     {id: 'Carol'}
    //   ],
    //   edges: [
    //     {source: 0, target: 1}, // Alice ??? Bob
    //     {source: 1, target: 2} // Bob ??? Carol
    //   ]
    //   // nodes: [ // ??????
    //   //   {name: 'master', values: 12},
    //   //   {name: 'das', values: 25},
    //   //   {name: 'fd', values: 39},
    //   //   {name: 'dsadsa', values: 45},
    //   //   {name: 'htr', values: 25},
    //   //   {name: 'vbcx', values: 24},
    //   //   {name: 'ht', values: 90},
    //   //   {name: 'nbv', values: 80},
    //   //   {name: 'yrt', values: 68},
    //   //   {name: 'jff', values: 63},
    //   //   {name: 'nbv', values: 25},
    //   //   {name: 'jyt', values: 45},
    //   //   {name: 'mb', values: 35},
    //   //   {name: 'jyt', values: 78},
    //   //   {name: 'gtre', values: 79},
    //   //   {name: 'bvc', values: 25},
    //   //   {name: 'mjh', values: 58},
    //   //   {name: 'ughf', values: 86},
    //   //   {name: 'juy', values: 79},
    //   //   {name: 'mjh', values: 53},
    //   //   {name: 'njm', values: 52},
    //   // ],
    //   // edges: [ // ???
    //   //   { source: 0, target: 1},
    //   //   { source: 0, target: 2},
    //   //   { source: 0, target: 3},
    //   //   { source: 0, target: 4},
    //   //   { source: 0, target: 5},
    //   //   { source: 0, target: 6},
    //   //   { source: 0, target: 7},
    //   //   { source: 0, target: 8},
    //   //   { source: 0, target: 9},
    //   //   { source: 0, target: 10},
    //   //   { source: 0, target: 11},
    //   //   { source: 0, target: 12},
    //   //   { source: 0, target: 13},
    //   //   { source: 0, target: 14},
    //   //   { source: 0, target: 15},
    //   //   { source: 0, target: 16},
    //   //   { source: 0, target: 17},
    //   //   { source: 0, target: 18},
    //   //   { source: 0, target: 19},
    //   //   { source: 0, target: 20}
    //   // ]
    // };
    // // ??????????????????????????????????????????????????????
    // const force = d3.forceSimulation(nodes) // ??????????????????
    //   .force('link', d3.forceLink(links).id(d => d.id)) // ???????????????
    //   .force('charge', d3.forceManyBody().strength(-400))
    //   .force('distance', (d) => { // ????????????????????????????????????????????????
    //     // console.log(d);
    //     return 10; // ???????????????
    //   }).force('center', d3.forceCenter());
    // const svg = d3.select('#model')
    //   .append('svg')
    //   .attr('width', w)
    //   .attr('height', h);
    //
    // // ?????????????????????svg??????
    // const edges = svg.selectAll('line')
    //   .data(links)
    //   .enter()
    //   .append('line')
    //   .style('stroke', (d) => { // ??????????????????
    //     return colors(d.color);
    //   })
    //   .style('opacity', 0.5)
    //   .style('stroke-width', (d, i) => { // ??????????????????
    //     return 1;
    //   });
    //
    // // ?????????????????????svg??????
    // const node = svg.selectAll('circle')
    //   .data(nodes)
    //   .enter()
    //   .append('circle')
    //   .attr('r', (d) => { // ????????????????????????master???10????????????5
    //     console.log(d, 'ddd');
    //     if ( d.name === 'master') {
    //       return 10;
    //     }
    //     return 5;
    //   })
    //   .style('fill', (d) => {
    //     return colors(d.weight * d.weight * d.weight);
    //   })
    //   .call(this.drag(force)); // ????????????
    //
    // // ????????????????????????????????????????????????
    // force.on('tick', () => {
    //   console.log('tick');
    //   nodes[0].x = w / 2;
    //   nodes[0].y = h / 2;
    //   // ???
    //   edges.attr('x1', (d) => {
    //     return  d.source.x;
    //   })
    //     .attr('y1', (d) => {
    //       return  d.source.y;
    //     })
    //     .attr('x2', (d) => {
    //       return  d.target.x;
    //     })
    //     .attr('y2', (d) => {
    //       return  d.target.y;
    //     });
    //
    //   // ??????
    //   node.attr('cx', (d) => {
    //     return d.x;
    //   })
    //     .attr('cy', (d) => {
    //       return d.y;
    //     });
    // });
  }

  relationProperties(arr, data, tar): void {
    Object.keys(data).map(key => {
      // console.log(key, 'pro', data);
      arr.push({
        source: data[key].Description || key,
        target: tar,
        relation: key,
        sourceImg: '',
        targetImg: '',
        sourceColor: '#F4793B',
        targetColor: '#0084ff',
        sourceRadius: '30',
        targetRadius: '35',
      });
      if (data[key].Type === 'object') {
        const target = data[key].Description || key;
        this.relationProperties(arr, data[key].Properties, target);
      }
      if (data[key].Type === 'array') {
        console.log(data[key], 'xxx', key);
        const t = data[key].Description || key;
        this.relationProperties(arr, data[key].Items.Properties, t);
      }
    });
  }

  ngAfterViewInit(): void {
    this.baseRepository.getAllModel().subscribe(res => {
      const arr = [];
      Object.keys(res).map(key => {
        Object.keys(res[key].Edges).map(k => {
          arr.push({
            // source: res[key].Edges[k].Description || res[key].Edges[k].Type,
            source: res[key].Edges[k].Type,
            target: key,
            relation: res[key].Edges[k].Name,
            sourceImg: '',
            targetImg: '',
            sourceColor: '#F4793B',
            targetColor: '#0084ff',
            sourceRadius: '30',
            targetRadius: '35',
          });
        });
        // if (res.Edges[key].Ref) {
        //   arr.push({
        //     source: 'User',
        //     target: res.Edges[key].Description || res.Edges[key].Type,
        //     relation: res.Edges[key].Name,
        //     sourceImg: '',
        //     targetImg: '',
        //     sourceColor: '#F4793B',
        //     targetColor: '#0084ff',
        //     sourceRadius: '30',
        //     targetRadius: '35',
        //   });
        // }
      });
      // this.relationProperties(arr, res.Properties, 'User');

      const options: any = {};
      options.backgroundColor = '#fff';
      options.nodesFontType = 'SimHei';
      options.nodesFontSize = 14;
      options.lineFontType = 'SimHei';
      options.lineFontSize = 12;
      options.lineColor = '#000000';
      options.showExamples = true;
      options.examplesX = 20;
      options.examplesY = 450;
      options.examplesFontColor = '#000000';
      this.drawChart('model', options, arr);

    });
  }

  drawChart(divid, options, datas, dataFilter?): void {
    const backgroundColor = options.backgroundColor; // ????????????
    const nodesFontType = options.nodesFontType; // ????????????
    const nodesFontSize = options.nodesFontSize; // ????????????
    const lineFontType = options.lineFontType; // ????????????
    const lineFontSize = options.lineFontSize; // ????????????
    const lineColor = options.lineColor; // ????????????
    const examplesFontColor = options.examplesFontColor; // ????????????????????????

    const width = window.innerWidth; // ?????????
    const height = window.innerHeight; // ?????????
    const svgChart = d3.select('svg');
    svgChart.remove();

    let sourceDatas = [];
    sourceDatas = datas.map( data => {
      const jsonObj: any = {};
      jsonObj.source = data.source;
      jsonObj.target = data.target;
      jsonObj.relation = data.relation;
      jsonObj.sourceImg = data.sourceImg;
      jsonObj.targetImg = data.targetImg;
      jsonObj.sourceColor = data.sourceColor;
      jsonObj.targetColor = data.targetColor;
      jsonObj.sourceRadius = data.sourceRadius;
      jsonObj.targetRadius = data.targetRadius;
      // ??????????????????????????????????????????
      jsonObj.lineColor = data.lineColor;
      switch (data.relation.length) {
        case 1: case 2: case 3:
          jsonObj.lineColor = '#458B00';
          break;
        case 4: case 5: case 6:
          jsonObj.lineColor = '#EEEE00';
          break;
        case 7: case 8: case 9:
          jsonObj.lineColor = '#8fd2e1';
          break;
        case 10: case 11: case 12:
          jsonObj.lineColor = '#c2de96';
          break;
        case 13: case 14: case 15:
          jsonObj.lineColor = '#ff4c00';
          break;
        default:
          jsonObj.lineColor = '#ffa39e';
      }
      jsonObj.data = data.data;
      return jsonObj;
    });
    console.log(sourceDatas, 'data');

    // ????????????
    const linkGroup = {};
    // ?????????????????????????????????????????????????????????????????????????????????????????????????????????????????????
    const linkMap = {};
    sourceDatas.map(item => {
      const key = item.source < item.target ? item.source + ':' + item.target : item.target + ':' + item.source;
      if (!linkMap.hasOwnProperty(key)) {
        linkMap[key] = 0;
      }
      linkMap[key] += 1;
      if (!linkGroup.hasOwnProperty(key)) {
        linkGroup[key] = [];
      }
      linkGroup[key].push(item);
    });
    console.log(linkGroup, 'group', linkMap);
    // ???????????????????????????size????????????????????????????????????????????????
    sourceDatas.map(item => {
      const kk = item.source < item.target ? item.source + ':' + item.target : item.target + ':' + item.source;
      item.size = linkMap[kk];
      // ??????????????????????????????
      const group = linkGroup[kk];
      // ?????????????????????
      if (group.length > 0) {
        this.setLinkNumber(group);
        // console.log('setGroup', linkGroup[kk]);
      }
    });

    // ??????
    const nodes = {};
    // ??????????????????
    const relationColor = {};
    console.log(sourceDatas, 'sourceDatas');
    sourceDatas.map(kk => {
      kk.source = nodes[kk.source] || (nodes[kk.source] = {
        name: kk.source,
        color: kk.sourceColor,
        image: kk.sourceImg,
        radius: kk.sourceRadius
      });
      kk.target = nodes[kk.target] || (nodes[kk.target] = {
        name: kk.target,
        color: kk.targetColor,
        image: kk.targetImg,
        radius: kk.targetRadius
      });
    });
    sourceDatas.map(key => {
      relationColor[key.relation] = {
        relation: key.relation,
        lineColor: key.lineColor,
      };
    });
    console.log(nodes, 'node');

    // const nodesArr = d3.values(nodes);
    const nodesArr = Object.keys(nodes).map(key => nodes[key]);

    // const relationColors = Object.keys(relationColor).map(key => relationColor[key]);
    // console.log(nodesArr, 'nodes', relationColors);
    //
    // const examplesX = parseFloat(options.examplesX); // ??????????????????x
    // const examplesY = parseFloat(options.examplesY); // ??????????????????y
    // const examplesLength = 80;
    // const examplesSize = Math.floor((width - examplesX) / examplesLength);
    // const examplesRow = relationColors.length % examplesSize === 0 ? relationColors.length / examplesSize : Math
    //   .ceil(relationColors.length / examplesSize);
    // // ????????????????????????
    // relationColors.forEach((item, index) => {
    //   const num = (index + 1) % examplesSize === 0 ? examplesSize : (index + 1) % examplesSize;
    //   item.x = examplesX + (num - 1) * examplesLength;
    //   item.y = examplesY + 20 * Math.ceil((index + 1) / examplesSize);
    // });

    // ??????????????????
    nodesArr.map(kk => {
      sourceDatas.map(k => {
        if (kk.name === k.source.name) {
          kk[k.target.name] = {
            name: k.target.name
          };
        }
        if (kk.name === k.target.name) {
          kk[k.source.name] = {
            name: k.source.name
          };
        }
      });
    });
    console.log(nodesArr, 'arr');
    // D3???????????????
    const force = d3.layout.force()
      .nodes(nodesArr)
      .links(sourceDatas)
      .size([width, height])
      .linkDistance(200)
      .charge(-1500);
      // .start();
    // ???????????????
    const zoom = d3.behavior.zoom()
      .scaleExtent([0.25, 2])
      .on('zoom', () => {
        const {
          translate,
          scale
        } = d3.event;
        container.attr('transform', 'translate(' + translate + ')scale(' + scale * 0.6 + ')');
      });
    const svg = d3.select('#' + divid).append('svg')
      .attr('width', '100%')
      .attr('height', height)
      .attr('style', 'background-color:' + backgroundColor)
      .call(zoom)
      .on('dblclick.zoom', null);
    // ??????????????????????????? container ?????????
    const zoomOverlay = svg.append('rect')
      .attr('width', '100%')
      .attr('height', height)
      .style('fill', 'none')
      .style('pointer-events', 'all');
    const container = svg.append('g')
      .attr('transform', 'scale(' + 0.6 + ')')
      .attr('class', 'container');

    const tooltip = d3.select('body').append('div')
      .attr('class', 'tooltip')
      .attr('opacity', 0.0);

    // ?????????????????????
    force.start();
    // ??????????????????
    for (let i = 0, n = 1000; i < n; ++i) {
      force.tick();
    }
    // ???????????????
    force.stop();
    // ??????????????????
    nodesArr.forEach(d => {
      d.fixed = true;
    });

    // ???????????????????????? ?????????
    // if (options.showExamples) {
    //   const examples = svg.selectAll('.examples')
    //     .data(relationColor)
    //     .enter()
    //     .append('svg:g')
    //     .attr('fill-opacity', (d) => {
    //       dataFilter.forEach(key => {
    //         if (d.relation === key.relation && key.isShow === 'false') {
    //           return 0.2;
    //         }
    //       });
    //       return 1;
    //     })
    //     .on('click', (d) => {
    //       dataFilter.map(key => {
    //         if (key.relation === d.relation) {
    //           if (key.isShow === 'true') {
    //             key.isShow = 'false';
    //           } else {
    //             key.isShow = 'true';
    //           }
    //         }
    //       });
    //       this.drawChart(divid, options, datas, dataFilter);
    //     });
    //
    //   examples.append('svg:path')
    //     .attr('d', (d) => {
    //       const x1 = d.x;
    //       const y1 = d.y;
    //       const x2 = x1 + 20;
    //       const y2 = y1;
    //       return 'M' + x1 + ' ' + y1 + ' L ' + x2 + ' ' + y2;
    //     })
    //     .style('stroke', (d) => {
    //       if (d.lineColor === '') {
    //         return lineColor;
    //       } else {
    //         return d.lineColor;
    //       }
    //     })
    //     .style('stroke-width', 2.5);
    //   examples.append('svg:text')
    //     .style('font-size', '14px')
    //     .style('fill', examplesFontColor)
    //     .attr('x', (d) => {
    //       if (d.relation.length > 3) {
    //         return d.x + 20 + 14 * 4 / 2;
    //       }
    //       return d.x + 20 + 14 * d.relation.length / 2;
    //     })
    //     .attr('y', (d) => {
    //       return d.y + 5;
    //     })
    //     .attr('text-anchor', 'middle')
    //     .text((d) => {
    //       if (d.relation.length > 3) {
    //         return d.relation.substring(0, 3) + '...';
    //       }
    //       return d.relation;
    //     })
    //     .on('mouseover', (d) => {
    //       console.log('???????????????');
    //       tooltip.html('<span>' + d.relation + '</span>')
    //         .style('left', (d3.event.pageX) + 'px')
    //         .style('top', (d3.event.pageY + 20) + 'px')
    //         .style('display', 'block')
    //         .style('position', 'absolut')
    //         .style('opacity', 1.0);
    //     })
    //     .on('mouseout', (d, i) => {
    //       tooltip.style('opacity', 0.0);
    //     });
    // }

    // marker?????? ???????????????????????????
    const edgesPath = container.selectAll('.edgepath')
      .data(sourceDatas)
      .enter()
      .append('path')
      .attr('fill', 'white')
      .attr('marker-start', (d, i) => 'url(#arrow' + i + ')')
      .attr('marker-mid', (d, i) => 'url(#arrow' + i + ')')
      .attr('marker-end', (d, i) => {
        const arrowMarker = container.append('marker')
          .attr('id', 'arrow' + i)
          .attr('markerUnits', 'userSpaceOnUse')
          .attr('markerWidth', '16')
          .attr('markerHeight', '15')
          .attr('viewBox', '0 0 12 12')
          .attr('refX', 9)
          .attr('refY', 6)
          .attr('orient', 'auto')
          .append('svg:path')
          .attr('d', 'M2,2 L10,6 L2,10 L6,6 L2,2')
          .attr('fill', () => {
            return d.lineColor = '' ? lineColor : d.lineColor;
          });

        return 'url(#arrow' + i + ')';
      })
      .style('stroke', (d) => {
        if (d.lineColor === '') {
          return lineColor;
        } else {
          return d.lineColor;
        }
      })
      .style('stroke-width', 1.5)
      .on('mouseover', (d) => {
        console.log('???????????????');
        // ????????????
        if (d.data) {
          tooltip.html('<span>' + '??????:' + d.data.rzs + '</span>')
            .style('left', (d3.event.pageX) + 'px')
            .style('top', (d3.event.pageY + 20) + 'px')
            .style('display', 'block')
            .style('opacity', 1.0);
        }
        // ???????????????????????????
        edgesText.style('fill-opacity', (edge) => {
          if (edge === d) {
            return 1;
          }
          return 0;
        });
        edgesPath.style('stroke-width', (edge) => {
          if (edge === d) {
            return 4;
          }
          return 1.5;
        });
      })
      .on('mouseout', (d, i) => {
        // ????????????????????????
        edgesText.style('fill-opacity', 1);
        edgesPath.style('stroke-width', 1.5);
        // ??????????????????
        tooltip.style('opacity', 0.0);
      });

    // ??????????????????????????????????????????????????????
    const edgesText = container.selectAll('.linetext')
      .data(sourceDatas)
      .enter()
      .append('svg:g')
      .attr('class', 'linetext')
      .attr('fill-opacity', 1);
    edgesText.append('svg:text')
      .style('font-size', (12 + 'px'))
      .style('font-family', lineFontType)
      .style('fill', '#000000')
      .attr('y', '.33em')
      .attr('text-anchor', 'middle')
      .text( (d) => {
        return d.relation;
      });

    edgesText.insert('rect', 'text')
      .attr('width', (d) => {
        return d.relation.length * lineFontSize;
      })
      .attr('height', (d) => {
        return lineFontSize;
      })
      .attr('y', '-.6em')
      .attr('x', (d) => {
        return -d.relation.length * lineFontSize / 2;
      })
      .style('fill', 'none');

    // ?????????????????????????????????????????????????????????
    const circle = container.selectAll('circle')
      .data(nodesArr)
      .enter()
      .append('circle')
      .style('stroke', (d) => {
        // if (d.color === '') {
        //   return '#EE8262';
        // } else if (d.color === '#0084ff') {
        //   return '#0077c6';
        // } else if (d.color === '#F4793B') {
        //   return '#FC3620';
        // }
        // return d.color;
      })
      .style('stroke-width', '2px')
      .attr('r', (d) => {
        return d.radius;
      })
      .attr('fill', (d, i) => {
        // ???????????????????????????????????????
        // console.log(d.color);
        if (d.image === '') {
          // if (d.color === '') {
          //   return '#EE8262';
          // }
          // return d.color;
          return '#0084ff';
        } else {
          // ??????????????????
          const defs = container.append('defs').attr('id', 'imgdefs');

          const catpattern = defs.append('pattern')
            .attr('id', 'catpattern' + i)
            .attr('height', 1)
            .attr('width', 1);

          catpattern.append('image')
            .attr('width', d.radius * 2)
            .attr('height', d.radius * 2)
            .attr('xlink:href', d.image);

          return 'url(#catpattern' + i + ')';
        }

      })
      .on('mouseover', (d, i) => {
        console.log('??????????????????');
        this.otherRelated(d, edgesText, circle, edgesPath, nodesText);
      })
      .on('mouseout', (d, i) => {
        // ????????????????????????
        edgesText.style('fill-opacity', 1);
        edgesPath.style('opacity', 1);
        circle.style('opacity', 1);
        nodesText.style('opacity', 1);
        tooltip.style('opacity', 0.0);
      })
      .call(force.drag);

    // ??????????????????
    const nodesText = container.selectAll('.nodetext')
      .data(nodesArr)
      .enter()
      .append('text')
      .attr('class', 'nodetext')
      .style('font-size', (nodesFontSize + 'px'))
      .style('fill', '#000')
      .style('font-family', nodesFontType)
      .attr('x', function(d): void {
        const that = this;
        // console.log(d3.select('.nodetext'), '..', that, d);
        const name = d.name;
        // ?????? ????????????????????? ?????????????????????
        // console.log(/^[\u4e00-\u9fa5]*$/.test(name), /^[\u4e00-\u9fa5]*$/.test('??????'));
        d3.select(that).append('tspan')
          .attr('dx', /^[\u4e00-\u9fa5]*$/.test(name) ? -nodesFontSize * (name.length / 2) : -nodesFontSize * (name.length / 4))
          .attr('dy', 5)
          .text( () => {
            return name;
          });
        // ????????????????????????????????????
        // if (name.length < 4) {
        //   d3.select(that).append('tspan')
        //     // .attr('dx', -nodesFontSize * (name.length / 2))
        //     .attr('dx', -nodesFontSize * (name.length / 4))
        //     .attr('dy', 5)
        //     .text( () => {
        //       return name;
        //     });
        // } else if (name.length >= 4 && name.length <= 6) {
        //   const top1 = d.name.substring(0, 3);
        //   const bot1 = d.name.substring(3, name.length);
        //
        //   d3.select(that).append('tspan')
        //     // .attr('dx', -nodesFontSize * 1.5)
        //     .attr('dx', -nodesFontSize * 0.75)
        //     .attr('dy', -nodesFontSize * 0.5)
        //     .text( () => {
        //       return top1;
        //     });
        //
        //   d3.select(that).append('tspan')
        //     // .attr('dx', -(nodesFontSize * name.length / 2))
        //     .attr('dx', -(nodesFontSize * name.length / 4))
        //     .attr('dy', nodesFontSize)
        //     .text( () => {
        //       return bot1;
        //     });
        // } else {
        //   const top = d.name.substring(0, 3);
        //   const mid = d.name.substring(3, 6);
        //   d3.select(that).append('tspan')
        //     // .attr('dx', -nodesFontSize * 1.5)
        //     .attr('dx', -nodesFontSize * 0.75)
        //     .attr('dy', -nodesFontSize * 0.5)
        //     .text( () => {
        //       return top;
        //     });
        //
        //
        //   d3.select(that).append('tspan')
        //     // .attr('dx', -nodesFontSize * 3)
        //     .attr('dx', -nodesFontSize * 1.5)
        //     .attr('dy', nodesFontSize)
        //     .text( () => {
        //       return mid;
        //     });
        //
        //   d3.select(that).append('tspan')
        //     // .attr('dx', -nodesFontSize * 2)
        //     .attr('dx', -nodesFontSize)
        //     .attr('dy', nodesFontSize)
        //     .text( () => {
        //       return '...';
        //     });
        // }
      })
      .on('mouseover', (d, i) => {
        console.log('??????????????????');
        this.otherRelated(d, edgesText, circle, edgesPath, nodesText);
        tooltip.html('<span>' + d.name + '</span>')
          .style('left', (d3.event.pageX) + 'px')
          .style('top', (d3.event.pageY + 20) + 'px')
          .style('display', 'block')
          .style('opacity', 1.0);
      })
      .on('mouseout', (d, i) => {
        // ????????????????????????
        edgesText.style('fill-opacity', 1);
        edgesPath.style('opacity', 1);
        circle.style('opacity', 1);
        nodesText.style('opacity', 1);
        tooltip.style('opacity', 0.0);

      })
      .call(force.drag);

    // ????????????
    const drag = force.drag()
      .on('dragstart', (d, i) => {
        d.fixed = true; // ?????????????????????????????????????????????
        // event.stopPropagation();
        d3.event.sourceEvent.stopPropagation();
      })
      .on('dragend', (d, i) => {})
      .on('drag', (d, i) => {});

    // ????????????????????????
    // force.on('start', () => {});

    // ????????????????????????
    // force.on('end', () => {});

    const tick = () => {
      edgesPath.attr('d', (d) => {
        const tan = Math.abs((d.target.y - d.source.y) / (d.target.x - d.source
          .x)); // ????????????tan???
        const x1 = d.target.x - d.source.x > 0 ? Math.sqrt(d.sourceRadius * d.sourceRadius / (
          tan * tan + 1)) + d.source.x :
          d.source.x - Math.sqrt(d.sourceRadius * d.sourceRadius / (tan * tan +
          1)); // ??????x??????
        let y1 = d.target.y - d.source.y > 0 ? Math.sqrt(d.sourceRadius * d.sourceRadius *
          tan * tan / (tan * tan + 1)) + d.source.y :
          d.source.y - Math.sqrt(d.sourceRadius * d.sourceRadius * tan * tan / (tan *
          tan + 1)); // ??????y??????
        const x2 = d.target.x - d.source.x > 0 ? d.target.x - Math.sqrt(d.targetRadius * d
          .targetRadius / (1 + tan * tan)) :
          d.target.x + Math.sqrt(d.targetRadius * d.targetRadius / (1 + tan *
          tan)); // ??????x??????
        let y2 = d.target.y - d.source.y > 0 ? d.target.y - Math.sqrt(d.targetRadius * d
          .targetRadius * tan * tan / (1 + tan * tan)) :
          d.target.y + Math.sqrt(d.targetRadius * d.targetRadius * tan * tan / (1 + tan *
          tan)); // ??????y??????
        if (d.target.x - d.source.x === 0 || tan === 0) { // ??????????????????????????????0???
          // console.log(d.source.name, d.target.name, 'user??');
          y1 = d.target.y - d.source.y > 0 ? d.source.y + d.sourceRadius : d.source.y - d
            .sourceRadius;
          y2 = d.target.y - d.source.y > 0 ? d.target.y - d.targetRadius : d.target.y + d
            .targetRadius;
        }
        // ????????? ??????????????????????????? d.source.name = d.target.name
        if (!x1 || !y1 || !x2 || !y2) {
          const dx0 = d.source.x;
          const dy0 = d.source.y;
          const dx1 = dx0 - 20;
          const dx2 = dx0 + 30;
          const dy1 = dy0 + 20;
          const dy2 = dy0 + 40;
          if (d.linknum > 1) {
            d.xStart = dx0 + 60;
            d.yStart = dy1 - 40;
            d.rotate = 90;
            return 'M ' + dx0 + ',' + dy0 + ' T' + (dx0 + 60) + ',' + (dy0 + 30) + ' T' +
              (dx0 + 100) + ',' + (dy0 + 10) + ' T' + dx0 + ',' + dy0;
          }
          d.xStart = dx0;
          d.yStart = dy0;
          d.rotate = 360;
          return 'M ' + dx0 + ',' + dy0 + ' T' + dx1 + ',' + dy1 + ' T' + dx2 + ',' + dy2 + ' T' + dx0 + ',' + dy0;
          // return;
        }
        if (d.linknum === 0) { // ???????????????0?????????????????????????????????????????????????????????
          d.xStart = x1;
          d.yStart = y1;
          d.xEnd = x2;
          d.yEnd = y2;
          return 'M ' + x1 + ' ' + y1 + ' L ' + x2 + ' ' + y2;
        }
        const a = d.sourceRadius > d.targetRadius ? d.targetRadius * d.linknum / 3 : d
          .sourceRadius * d.linknum / 3;
        const xm = d.target.x - d.source.x > 0 ? d.source.x + Math.sqrt((d.sourceRadius * d
          .sourceRadius - a * a) / (1 + tan * tan)) :
          d.source.x - Math.sqrt((d.sourceRadius * d.sourceRadius - a * a) / (1 + tan *
          tan));
        let ym = d.target.y - d.source.y > 0 ? d.source.y + Math.sqrt((d.sourceRadius * d
          .sourceRadius - a * a) * tan * tan / (1 + tan * tan)) :
          d.source.y - Math.sqrt((d.sourceRadius * d.sourceRadius - a * a) * tan * tan / (
          1 + tan * tan));
        const xn = d.target.x - d.source.x > 0 ? d.target.x - Math.sqrt((d.targetRadius * d
          .targetRadius - a * a) / (1 + tan * tan)) :
          d.target.x + Math.sqrt((d.targetRadius * d.targetRadius - a * a) / (1 + tan *
          tan));
        let yn = d.target.y - d.source.y > 0 ? d.target.y - Math.sqrt((d.targetRadius * d
          .targetRadius - a * a) * tan * tan / (1 + tan * tan)) :
          d.target.y + Math.sqrt((d.targetRadius * d.targetRadius - a * a) * tan * tan / (
          1 + tan * tan));
        if (d.target.x - d.source.x === 0 || tan === 0) { // ?????????????????????0???
          ym = d.target.y - d.source.y > 0 ? d.source.y + Math.sqrt(d.sourceRadius * d
            .sourceRadius - a * a) : d.source.y - Math.sqrt(d.sourceRadius * d
            .sourceRadius - a * a);
          yn = d.target.y - d.source.y > 0 ? d.target.y - Math.sqrt(d.targetRadius * d
            .targetRadius - a * a) : d.target.y + Math.sqrt(d.targetRadius * d
            .targetRadius - a * a);
        }

        const k = (x1 - x2) / (y2 - y1); // ?????????????????????
        let dx = Math.sqrt(a * a / (1 + k * k)); // ????????????x?????????
        let dy = Math.sqrt(a * a * k * k / (1 + k * k)); // ????????????y?????????
        if ((y2 - y1) === 0) {
          dx = 0;
          dy = Math.sqrt(a * a);
        }
        let xs;
        let ys;
        let xt;
        let yt;
        if (a > 0) {
          xs = k > 0 ? xm - dx : xm + dx;
          ys = ym - dy;
          xt = k > 0 ? xn - dx : xn + dx;
          yt = yn - dy;
        } else {
          xs = k > 0 ? xm + dx : xm - dx;
          ys = ym + dy;
          xt = k > 0 ? xn + dx : xn - dx;
          yt = yn + dy;
        }
        // ????????????????????????????????????????????????????????????
        d.xStart = xs;
        d.yStart = ys;
        d.xEnd = xt;
        d.yEnd = yt;
        return 'M ' + xs + ' ' + ys + ' L ' + xt + ' ' + yt;
      });

      // ?????????????????????????????????
      edgesText.attr('transform', (d) => {
        // ???????????? ??????????????????????????? d.source.name = d.target.name
        if (!d.xStart || !d.yStart || !d.xEnd || !d.yEnd) {
          // console.log(d.x_start, d.y_start, d.x_end, d.y_end, 'end', d);
          return 'translate(' + (d.xStart + 40) + ',' + (+d.yStart + 40) +
            ')' + ' rotate(' + d.rotate + ')';
        }
        return 'translate(' + (d.xStart + d.xEnd) / 2 + ',' + ((+d.yStart) + (+d
            .yEnd)) / 2 +
          ')' + ' rotate(' + Math.atan((d.yEnd - d.yStart) / (d.xEnd - d.xStart)) *
          180 / Math.PI + ')';
      });

      // ???????????????????????????
      circle.attr('cx', (d) => {
        return d.x;
      });
      circle.attr('cy', (d) => {
        return d.y;
      });

      nodesText.attr('x', (d) => {
        return d.x;
      });
      nodesText.attr('y', (d) => {
        return d.y;
      });
    };
    // ??????????????????
    // ??????1????????????????????? tick ??????????????????????????????????????????
    // ??????2???????????????????????? edgesPath, nodeText, edgesText, circle ???
    setTimeout(() => {
      tick();
    }, 1);

    force.on('tick', tick);
  }

  // ????????????
  setLinkNumber(group): void {
    if (group.length === 1) {
      group[0].linknum = 0;
    } else {
      const maxLinkNumber = group.length % 2 === 0 ? group.length / 2 : (group.length - 1) / 2;
      let startLinkNumber = group.length % 2 === 0 ? (-maxLinkNumber + 0.5) : (-maxLinkNumber);
      group.forEach(key => key.linknum = ++startLinkNumber);
    }
  }

  otherRelated(d, edgesText, circle, edgesPath, nodesText): void {
    // ???????????????????????????
    edgesText.style('fill-opacity', (edge) => {
      if (edge.source === d || edge.target === d) {
        return 1;
      }
      if (edge.source !== d && edge.target !== d) {
        return 0;
      }
    });
    // ????????????????????????
    circle.style('opacity', (edge) => {
      const v = d.name;
      if (edge.name === v || (edge[v] !== undefined && edge[v].name === v)) {
        return 1;
      } else {
        return 0.2;
      }
    });
    // ????????????????????????
    edgesPath.style('opacity', (edge) => {
      if (edge.source === d || edge.target === d) {
        return 1;
      }
      if (edge.source !== d && edge.target !== d) {
        return 0.2;
      }
    });
    // ??????????????????????????????
    nodesText.style('opacity', (edge) => {
      const v = d.name;
      if (edge.name === v || (edge[v] !== undefined && edge[v].name === v)) {
        return 1;
      } else {
        return 0.2;
      }
    });
  }
}
