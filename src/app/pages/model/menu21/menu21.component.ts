import {AfterViewInit, Component, OnInit} from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'app-menu21',
  templateUrl: './menu21.component.html',
  styleUrls: ['./menu21.component.scss']
})
export class Menu21Component implements OnInit, AfterViewInit {
  constructor() {
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
  color = d3.scaleOrdinal(this.types, d3.schemeCategory10);
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
    console.log(this.data);
    this.chart();
  }

  chart(): any {
    const links = this.data.links.map(d => Object.create(d));
    const nodes = this.data.nodes.map(d => Object.create(d));
    const width = 750;
    console.log(links, nodes, 'sss');
    const simulation = d3.forceSimulation(nodes)
      .force('link', d3.forceLink(links).id(d => d.id))
      .force('charge', d3.forceManyBody().strength(-400))
      .force('x', d3.forceX())
      .force('y', d3.forceY());
    console.log(simulation, 'sim');

    const svg = d3.create('svg')
      .attr('viewBox', [-width / 2, -this.height / 2, width, this.height])
      .style('font', '12px sans-serif');

    // Per-type markers, as they don't inherit styles.
    svg.append('defs').selectAll('marker')
      .data(this.types)
      .join('marker')
      .attr('id', d => `arrow-${d}`)
      .attr('viewBox', '0 -5 10 10')
      .attr('refX', 15)
      .attr('refY', -0.5)
      .attr('markerWidth', 6)
      .attr('markerHeight', 6)
      .attr('orient', 'auto')
      .append('path')
      .attr('fill', this.color)
      .attr('d', 'M0,-5L10,0L0,5');

    const link = svg.append('g')
      .attr('fill', 'none')
      .attr('stroke-width', 1.5)
      .selectAll('path')
      .data(links)
      .join('path')
      .attr('stroke', d => this.color(d.type))
      .attr('marker-end', d => `url(${new URL(`#arrow-${d.type}`)})`);

    const node = svg.append('g')
      .attr('fill', 'currentColor')
      .attr('stroke-linecap', 'round')
      .attr('stroke-linejoin', 'round')
      .selectAll('g')
      .data(nodes)
      .join('g')
      .call(this.drag(simulation));

    node.append('circle')
      .attr('stroke', 'white')
      .attr('stroke-width', 1.5)
      .attr('r', 4);

    node.append('text')
      .attr('x', 8)
      .attr('y', '0.31em')
      .text(d => d.id)
      .clone(true).lower()
      .attr('fill', 'none')
      .attr('stroke', 'white')
      .attr('stroke-width', 3);

    simulation.on('tick', () => {
      link.attr('d', this.linkArc);
      node.attr('transform', d => `translate(${d.x},${d.y})`);
    });

    // invalidation.then(() => simulation.stop());

    return svg.node();
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

  ngAfterViewInit(): void {
    const data = [{
        source: '陆洋',
        data: {
          rzs: '1000万美元',
        },
        target: '建银国际产业基金管理有限公司',
        relation: '投资',
        sourceImg: 'http://mail.tom.com/error/i2.gif',
        targetImg: '',
        sourceColor: '#F4793B',
        targetColor: '#0084ff',
        sourceRadius: '30',
        targetRadius: '35',
      },
        {
          source: '陆洋',
          data: {
            rzs: '12万美元',
          },
          target: '投足有限公司',
          relation: '投资',
          sourceImg: 'http://mail.tom.com/error/i2.gif',
          targetImg: '',
          sourceColor: '#F4793B',
          targetColor: '#0084ff',
          sourceRadius: '30',
          targetRadius: '35',
        },
        {
          source: '汪红辉',
          target: '乾行文化投资公司',
          relation: '投资',
          sourceImg: '',
          targetImg: '',
          sourceColor: '#F4793B',
          targetColor: '#0084ff',
          sourceRadius: '30',
          targetRadius: '35',
        },
        {
          source: '汪红辉',
          target: '天津裕丰股权投资管理有限公司',
          relation: '董事',
          sourceImg: '',
          targetImg: '',
          sourceColor: '#F4793B',
          targetColor: '#0084ff',
          sourceRadius: '30',
          targetRadius: '35',
        },
        {
          source: '汪红辉',
          target: '乾行文化投资公司',
          relation: '法人',
          sourceImg: '',
          targetImg: '',
          sourceColor: '#F4793B',
          targetColor: '',
          sourceRadius: '30',
          targetRadius: '35',
        },
        {
          source: '汪红辉',
          target: '乾行文化投资公司',
          relation: '董事长',
          sourceImg: '',
          targetImg: '',
          sourceColor: '#F4793B',
          targetColor: '',
          sourceRadius: '30',
          targetRadius: '35',
        },
        {
          source: '汪红辉',
          target: '建银国际产业基金管理有限公司',
          relation: '董事',
          sourceImg: '',
          targetImg: '',
          sourceColor: '#F4793B',
          targetColor: '#0084ff',
          sourceRadius: '30',
          targetRadius: '35',
        },
        {
          source: '胡章宏',
          target: '建银国际产业基金管理有限公司',
          relation: '董事长',
          sourceImg: '',
          targetImg: '',
          sourceColor: '#F4793B',
          targetColor: '#0084ff',
          sourceRadius: '30',
          targetRadius: '35',
        },
    ];
    const options: any = {};
    options.backgroundColor = '#eee';
    options.nodesFontType = 'SimHei';
    options.nodesFontSize = 14;
    options.lineFontType = 'SimHei';
    options.lineFontSize = 12;
    options.lineColor = '#000000';
    options.showExamples = true;
    options.examplesX = 20;
    options.examplesY = 450;
    options.examplesFontColor = '#000000';
    this.drawChart('model', options, data);
  }

  drawChart(divid, options, datas, dataFilter?): void {
    const backgroundColor = options.backgroundColor; // 背景颜色
    const nodesFontType = options.nodesFontType; // 节点字体
    const nodesFontSize = options.nodesFontSize; // 节点字号
    const lineFontType = options.lineFontType; // 关系字体
    const lineFontSize = options.lineFontSize; // 关系字号
    const lineColor = options.lineColor; // 连线颜色
    const examplesFontColor = options.examplesFontColor; // 关系示例字体颜色

    const width = window.innerWidth; // 画布宽
    const height = window.innerHeight; // 画布高
    const svgChart = d3.select('svg');
    svgChart.remove();

    // var tip = $(".tooltip");
    // if (tip.length > 0) {
    //   tip.remove();
    // }


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
      // 根据关系类型添加连接线的颜色
      jsonObj.lineColor = data.lineColor;
      switch (data.relation) {
        case '投资':
          jsonObj.lineColor = '#458B00';
          break;
        case '总经理':
          jsonObj.lineColor = '#EEEE00';
          break;
        case '董事':
          jsonObj.lineColor = '#8fd2e1';
          break;
        case '法人':
          jsonObj.lineColor = '#c2de96';
          break;
        case '董事长':
          jsonObj.lineColor = '#ff4c00';
          break;
        default:
          jsonObj.lineColor = '#000';
      }
      jsonObj.data = data.data;
      return jsonObj;
    });
    console.log(sourceDatas);
    // var resourceLinks = sourceDatas.links;

    if (dataFilter !== undefined && dataFilter.length > 0) {
      const indexArray = [];
      dataFilter.map(vv => {
        sourceDatas.map((v, index: number) => {
          if (v.relation === vv.relation && vv.isShow === 'false') {
            indexArray.push(index);
          }
        });
      });
      if (indexArray.length > 0) {
        const tempArray = [];
        sourceDatas.map((v, ix) => {
          indexArray.map(idx => {
            if (idx !== ix) {
              if (idx === indexArray.length - 1) {
                tempArray.push(v);
              }
            }
          });
        });
        sourceDatas = tempArray;
      }
    }
    // var links = resourceLinks;

    // 关系分组
    const linkGroup = {};
    // 对连接线进行统计和分组，不区分连接线的方向，只要属于同两个实体，即认为是同一组
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
    // 为每一条连接线分配size属性，同时对每一组连接线进行编号
    sourceDatas.map(item => {
      const kk = item.source < item.target ? item.source + ':' + item.target : item.target + ':' + item.source;
      item.size = linkMap[kk];
      // 同一组的关系进行编号
      const group = linkGroup[kk];
      // 给节点分配编号
      if (group.length > 0) {
        this.setLinkNumber(group);
        console.log('setGroup', linkGroup[kk]);
      }
    });

    // // 节点
    // let nodes = {};
    // // 关系对应颜色
    // let relationColor = {};
    // d3.csvParse()
    //
    // for (var i = 0; i < sourceDatas.length; i++) {
    //   sourceDatas[i].source = nodes[sourceDatas[i].source] || (nodes[sourceDatas[i].source] = {
    //     name: sourceDatas[i].source,
    //     color: sourceDatas[i].sourceColor,
    //     image: sourceDatas[i].sourceImg,
    //     radius: sourceDatas[i].sourceRadius
    //   });
    //   sourceDatas[i].target = nodes[sourceDatas[i].target] || (nodes[sourceDatas[i].target] = {
    //     name: sourceDatas[i].target,
    //     color: sourceDatas[i].targetColor,
    //     image: sourceDatas[i].targetImg,
    //     radius: sourceDatas[i].targetRadius
    //   });
    // }
    //
    // var sourceData = datas.links;
    // for (var i = 0; i < sourceData.length; i++) {
    //   relationColor[sourceData[i].relation] = {
    //     "relation": sourceData[i].relation,
    //     "lineColor": sourceData[i].lineColor
    //   };
    // }
    //
    //

    // nodes = d3.values(nodes);
    // relationColor = d3.values(relationColor);
    //
    // var examples_x = parseFloat(options.examplesX); //关系示例坐标x
    // var examples_y = parseFloat(options.examplesY); //关系示例坐标y
    // var examplesLength = 80;
    // var examplesSize = Math.floor((width - examples_x) / examplesLength);
    // var examplesRow = relationColor.length % examplesSize == 0 ? relationColor.length / examplesSize : Math
    //   .ceil(relationColor.length / examplesSize);
    // //计算关系示列位置
    // for (var i = 1; i <= relationColor.length; i++) {
    //   var num = i % examplesSize == 0 ? examplesSize : i % examplesSize;
    //   relationColor[i - 1].x = examples_x + (num - 1) * examplesLength;
    //   relationColor[i - 1].y = examples_y + 20 * Math.ceil(i / examplesSize);
    // }
    // if (dataFilter == undefined) {
    //   dataFilter = [];
    //   for (var i = 0; i < relationColor.length; i++) {
    //     dataFilter.push({
    //       "relation": relationColor[i].relation,
    //       "isShow": "true"
    //     });
    //   }
    // }
    //
    //
    // //绑定相连节点
    // for (var i = 0; i < nodes.length; i++) {
    //   for (var j = 0; j < links.length; j++) {
    //     if (nodes[i].name == links[j].source.name) {
    //       nodes[i][links[j].target.name] = {
    //         name: links[j].target.name
    //       };
    //     }
    //     if (nodes[i].name == links[j].target.name) {
    //       nodes[i][links[j].source.name] = {
    //         name: links[j].source.name
    //       };
    //     }
    //   }
    // }
    // //D3力导向布局
    // var force = d3.layout.force()
    //   .nodes(nodes)
    //   .links(links)
    //   .size([width, height])
    //   .linkDistance(200)
    //   .charge(-1500)
    //   .start();
    // // 全图缩放器
    // var zoom = d3.behavior.zoom()
    //   .scaleExtent([0.25, 2])
    //   .on('zoom', zoomFn);
    // var svg = d3.select("#" + divid).append("svg")
    //   .attr("width", width)
    //   .attr("height", height)
    //   .attr("style", "background-color:" + backgroundColor)
    //   .call(zoom)
    //   .on('dblclick.zoom', null);
    // // 缩放层（位置必须在 container 之前）
    // var zoomOverlay = svg.append('rect')
    //   .attr('width', width)
    //   .attr('height', height)
    //   .style('fill', 'none')
    //   .style('pointer-events', 'all');
    // var container = svg.append('g')
    //   .attr('transform', 'scale(' + 0.6 + ')')
    //   .attr('class', 'container');
    // // 根据分类进行筛选
    // if (options.showExamples) {
    //   var examples = svg.selectAll(".examples")
    //     .data(relationColor)
    //     .enter()
    //     .append("svg:g")
    //     .attr("fill-opacity", function(d) {
    //       for (var i = 0; i < dataFilter.length; i++) {
    //         if (d.relation == dataFilter[i].relation && dataFilter[i].isShow == "false") {
    //           return 0.2;
    //         }
    //       }
    //       return 1;
    //     })
    //     .on("click", function(d) {
    //       for (var i = 0; i < dataFilter.length; i++) {
    //         if (dataFilter[i].relation == d.relation) {
    //           if (dataFilter[i].isShow == "true") {
    //             dataFilter[i].isShow = "false";
    //           } else {
    //             dataFilter[i].isShow = "true";
    //           }
    //         }
    //       }
    //       drawChart(divid, options, datas, dataFilter);
    //     });
    //
    //
    //   examples.append("svg:path")
    //     .attr("d", function(d) {
    //       var x1 = d.x;
    //       var y1 = d.y;
    //       var x2 = x1 + 20;
    //       var y2 = y1;
    //       return 'M' + x1 + ' ' + y1 + ' L ' + x2 + ' ' + y2;
    //     })
    //     .style("stroke", function(d) {
    //       if (d.lineColor == "") {
    //         return lineColor;
    //       } else {
    //         return d.lineColor;
    //       }
    //     })
    //     .style("stroke-width", 2.5);
    //   examples.append("svg:text")
    //     .style("font-size", "14px")
    //     .style("fill", examplesFontColor)
    //     .attr("x", function(d) {
    //       if (d.relation.length > 3) {
    //         return d.x + 20 + 14 * 4 / 2;
    //       }
    //       return d.x + 20 + 14 * d.relation.length / 2;
    //     })
    //     .attr("y", function(d) {
    //       return d.y + 5;
    //     })
    //     .attr('text-anchor', "middle")
    //     .text(function(d) {
    //       if (d.relation.length > 3) {
    //         return d.relation.substring(0, 3) + "...";
    //       }
    //       return d.relation;
    //     })
    //     .on("mouseover", function(d) {
    //       console.log('放到分类上');
    //       tooltip.html("<span>" + d.relation + "</span>")
    //         .style("left", (d3.event.pageX) + "px")
    //         .style("top", (d3.event.pageY + 20) + "px")
    //         .style("display", "block")
    //         .style("position", "absolute")
    //         .style("opacity", 1.0);
    //     })
    //     .on("mouseout", function(d, i) {
    //       tooltip.style("opacity", 0.0);
    //     });
    // }
  }

  // 分配编号
  setLinkNumber(group): void {
    if (group.length === 1) {
      group[0].linknum = 0;
    } else {
      const maxLinkNumber = group.length % 2 === 0 ? group.length / 2 : (group.length - 1) / 2;
      let startLinkNumber = group.length % 2 === 0 ? (-maxLinkNumber + 0.5) : (-maxLinkNumber);
      group.forEach(key => key.linknum = ++startLinkNumber);
    }
    // return group;
  }
}
