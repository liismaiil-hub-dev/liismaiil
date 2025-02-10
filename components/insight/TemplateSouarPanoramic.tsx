'use client'
import { addGuestToStage, createNewStage, getInsightTemplateByNb } from '@/actions/stage';
import { Ayah, StatsTemplateType } from '@/app/api/graphql/stage/stage.types';
import { stageActions } from "@/store/slices/stageSlice";
import { RootStateType } from '@/store/store';
import { cn } from '@/lib/cn-utility'
import _ from 'lodash';
import { memo, use, useEffect, useRef, useState, useTransition } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import SpaceButton from './SpaceButton';
import { useFormState, useFormStatus } from 'react-dom';
import {scaleLinear,BaseType, pointer, pointers, select, min, max,scalePow, 
    tickFormat, interpolateHslLong, scaleSequential, interpolateRdYlBu, scaleOrdinal, schemeCategory10,interpolate,
    interpolateHclLong,scaleQuantile,
    interpolateRainbow,
    scaleQuantize,
    scaleThreshold,
    scaleBand,
    scalePoint,
    axisLeft,
    schemePastel1} from "d3";
import { SECTIONS_SOURAS } from '@/store/constants/constants';
import { getStatTaysir } from '@/actions/sprint';
const dimentions = {
    width:700,
    height:300,
    margin :{
        top:20,
        right:20,
        bottom:20,
        left:20,}}

enum OrderEnum { 
    ASC ='ASC',
    DESC =  'DESC'
}
function updateBars( d, i, n) {
    console.log({updated: d, updatei:i, updateN:n});
   const _myrect = select(n[i])
   console.log({_myrect});
   
   _myrect
}
const {height, margin, width } = dimentions
const boundedWidth = width -margin.left -margin.right 
const boundedHeight = height  -margin.top -margin.bottom
/**
 * .order((a,b) => {
    if(order === OrderEnum.ASC){
        console.log({order});
        
        return Number(a.diameter) - Number(b.diameter)
        }else {
            return Number(b.diameter) - Number(a.diameter)
        
    }
    })
    */
  // const colorScale =scaleOrdinal([1,114], schemePastel1).unknown(null)  
   const colorScale =scaleSequential([1,114 ], ['blue', "orange"]).interpolator(interpolateRainbow)
const drawTiwal = ({
    SVG,
    order, 
    data
}:{
    SVG:Selection<BaseType, unknown, HTMLElement, any> | ElementType,
    order:OrderEnum
    data:StatsTemplateType[]
}) => {
    console.log({data});
    try {
        const _souraNb = data.map((wind)=> wind.souraNb )
        const WIND_max = data.map((wind)=> wind.max )
        const WIND_min = data.map((wind)=> wind.min )
        const souraNbArr = [...new Set(_souraNb)];

    const SVG_WIDTH = select(SVG).node().clientWidth 
    const SVG_HIGHT = select(SVG).node().clientHeight
    const WINDOW_LENGTH = data.length
     const WINDOW_AY_MAX = Math.max(...WIND_max)
     const WINDOW_AY_MIN = Math.min(...WIND_min)
 // const    souraNbArr = souraNbArr.filter((win) =>  win < 8)
     console.log({SVG_WIDTH,SVG_HIGHT, WINDOW_LENGTH, WINDOW_AY_MAX , WINDOW_AY_MIN, souraNbArr});
     /* 
 SVG.on('click' ,  (e, d) => {
    //return null // 
      console.log({ pointers:pointers(e), d});
  }) */
  const _xScale = scaleLinear()
                    .domain([WINDOW_AY_MIN,WINDOW_AY_MAX ])
                    .rangeRound([margin.left, boundedWidth]).clamp(true)
  const xScale = scaleBand()
                    .domain([WINDOW_AY_MIN,WINDOW_AY_MAX ])
                    .range([margin.left, boundedWidth])
                    //.clamp(true)

                    const _xticks =   _xScale.ticks(100) 
console.log({WINDOW_AY_MIN,WINDOW_AY_MAX });

const yScale = scaleLinear()
                .domain([Math.max(...souraNbArr),Math.min(...souraNbArr) ])
                .rangeRound([ boundedHeight, margin.top])
                .clamp(true)
    const _yScale = scalePoint()
                .domain([Math.min(...souraNbArr),Math.max(...souraNbArr) ])
                .rangeRound([margin.top, boundedHeight])
               // .clamp(true)
       //d3.interpolateRdYlBu         
    //const colorScale =scaleOrdinal([Math.min(...souraNbArr),Math.max(...souraNbArr) ], schemeCategory10).unknown(null)  
    const _colorScale =scaleLinear([Math.min(...souraNbArr),Math.max(...souraNbArr) ], ['blue', "orange"])
    .unknown(null).clamp(true)  
  //.interpolate(interpolateHclLong)
    SVG.attr('viewBox', `0 0 ${width} ${height}`).style('background-color', 'rgb(240,240,240)')
     const _svgWindow = SVG?.selectAll('rect')
                .data(data, async function(d, i ,n){
                    return d})
                .join('rect')
                .attr('width',function(d, i ){
                       /*  console.log({dmax:d.max,
                                    dmin:d.min ,
                                    xDmax:_xScale(d.max),
                                    xDmin:_xScale(d.min),
                                    width:_xScale(d.max) - _xScale(d.min)}); */
                    return (d.max - d.min )

                        })
                .attr('height', function(d){
                    return 8
                })
                .attr('x', function(d, i){
                  //  console.log({ min:d.min});
                    return _xScale(d.min) + i * 2 
                }).attr('transform','translate(-27,-10)')
                .attr('y', function(d, i){
                    //console.log({ souraNb:d.souraNb, scal: _yScale(d.souraNb)});
                    return yScale(d.souraNb) 
                         //_yScale(d.souraNb)  
                    })
                    .attr('fill', (d ) => colorScale(d.souraNb))
                    .attr('rx', '2')
                    .attr('ry', '2')
                    .attr('transform','translate(10,0)') 
 
/* const _svgText = SVG?.selectAll('rect')
                    .data(data, async function(d, i ,n){
                        return d})
                    .join('rect').on('click', (e, d) => {
                        //return null // 
                          console.log({ pointers:pointers(e), d});
                      })
                    .attr('width',
                        function(d ){
                            return (_xScale(d.max)- _xScale(d.min))
                        }
                    )
                    .attr('height', function(d){
                        console.log({ min:d.min , height:boundedHeight / souraNbArr.length -5});
                        return '3'
                        })
                    .attr('x', function(d){
                        console.log({ min:d.min});
                        return _xScale(d.min)
                        })
                    .attr('y', function(d,i ){
                        return i * 3 + 5
                        
                        }).style('fill',function(d, ){
                            console.log({colord:d});
                            
                            return colorScale(d.souraNb)
                        })
 */// Min Ayah 
  
 const _ayMinWind =   SVG?.selectAll('text')
.data(data)
.join('text')
.text(function(d,i, n){
        console.log({dMaxMIN: d.max - d.min});
        
        return `${d.min}`
  //`${d.souraNb}-${d.ayMin}`
   })
.attr('x', (d, i ) => _xScale(d.min) -i*3    )
.attr('y', function(d,i ){
    return yScale(d.souraNb) 
    }) 
    .style('fill',(d ) => colorScale(d.souraNb)) 
    .style('font-size','7px')
    .style('font-weight','light')
    .attr('transform',(d, i) => `translate(${i== 0 ? 15: i*5},0)`) 
    
 const _ayMaxWind =   SVG?.selectAll('text:nth-of-type(2)')
 .data(data)
 .join('text')
 .text(function(d,i){
     //console.log({ayMin:d.ayMin});
     
     return `${d.max}` 
     //`${d.souraNb}-${d.ayMin}`
    })
 .attr('x', (d, i ) => _xScale(d.min)  -i*3 )
 .attr('y', function(d,i ){
     return yScale(d.souraNb) +17 
     }) 
    .style('fill',(d ) => colorScale(d.souraNb)) 
     .style('font-size','7px')
     .style('font-weight','light')
     .attr('transform',(d, i) => `translate(${i== 0 ? 15: i*7},0)`) 
    
    //   .attr('transform','rotate(45)')

      //  console.log({_svgWindow, _ayMinWind, scalPo: scalePow().exponent()});
 
const _yAxisLeft = axisLeft(yScale)
const _displayYAxisG = SVG.select('g')
                .attr('id','yAxisLeftG')
               .attr('transform','translate(30,0)')    
             //   .attr('margin', '10')
               _yAxisLeft(_displayYAxisG)

}catch(error) {
console.log({error});

}}
const drawMiin = ({
    SVG,
    order, 
    data
}:{
    SVG:Selection<BaseType, unknown, HTMLElement, any> | ElementType,
    order:OrderEnum
    data:StatsTemplateType[]
}) => {
    console.log({data});
    try {
        const _souraNb = data.map((wind)=> wind.souraNb )
        const WIND_max = data.map((wind)=> wind.max )
        const WIND_min = data.map((wind)=> wind.min )
        const souraNbArr = [...new Set(_souraNb)];

    const SVG_WIDTH = select(SVG).node().clientWidth 
    const SVG_HIGHT = select(SVG).node().clientHeight
    const WINDOW_LENGTH = data.length
     const WINDOW_AY_MAX = Math.max(...WIND_max)
     const WINDOW_AY_MIN = Math.min(...WIND_min)
  //const    souraNbArr = souraNbArr.filter((win) =>  win < 8)
     console.log({SVG_WIDTH,SVG_HIGHT, WINDOW_LENGTH, WINDOW_AY_MAX , WINDOW_AY_MIN, souraNbArr});
     /* 
 SVG.on('click' ,  (e, d) => {
    //return null // 
      console.log({ pointers:pointers(e), d});
  }) */
  const _xScale = scaleLinear()
                    .domain([WINDOW_AY_MIN,WINDOW_AY_MAX ])
                    .rangeRound([margin.left, boundedWidth]).clamp(true)
  const xScale = scaleBand()
                    .domain([WINDOW_AY_MIN,WINDOW_AY_MAX ])
                    .range([margin.left, boundedWidth])
                    //.clamp(true)

                    const _xticks =   _xScale.ticks(100) 
console.log({WINDOW_AY_MIN,WINDOW_AY_MAX });

const yScale = scaleLinear()
                .domain([Math.max(...souraNbArr),Math.min(...souraNbArr) ])
                .rangeRound([ boundedHeight, margin.top])
                .clamp(true)
    const _yScale = scalePoint()
                .domain([Math.min(...souraNbArr),Math.max(...souraNbArr) ])
                .rangeRound([margin.top, boundedHeight])
               // .clamp(true)
        //.interpolate(interpolateHclLong)
    SVG.attr('viewBox', `0 0 ${width} ${height}`).style('background-color', 'rgb(240,240,240)')
     const _svgWindow = SVG?.selectAll('rect')
                .data(data, async function(d, i ,n){
                    return d})
                .join('rect')
                .attr('width',function(d, i ){
                       /*  console.log({dmax:d.max,
                                    dmin:d.min ,
                                    xDmax:_xScale(d.max),
                                    xDmin:_xScale(d.min),
                                    width:_xScale(d.max) - _xScale(d.min)}); */
                    return (d.max - d.min )

                        })
                .attr('height', function(d){
                    return 8
                })
                .attr('x', function(d, i){
                  //  console.log({ min:d.min});
                    return _xScale(d.min) + i * 2 
                }).attr('transform','translate(-27,-10)')
                .attr('y', function(d, i){
                    //console.log({ souraNb:d.souraNb, scal: _yScale(d.souraNb)});
                    return yScale(d.souraNb) 
                         //_yScale(d.souraNb)  
                    })
                    .attr('fill', (d ) => colorScale(d.souraNb))
                    .attr('rx', '2')
                    .attr('ry', '2')
                    .attr('transform','translate(10,0)') 
 
 const _ayMinWind =   SVG?.selectAll('text')
.data(data)
.join('text')
.text(function(d,i, n){
        console.log({dMaxMIN: d.max - d.min});
        
        return `${d.min}`
  //`${d.souraNb}-${d.ayMin}`
   })
.attr('x', (d, i ) => _xScale(d.min)   )
.attr('y', function(d,i ){
    return yScale(d.souraNb) 
    }) 
    .style('fill',(d ) => colorScale(d.souraNb)) 
    .style('font-size','7px')
    .style('font-weight','light')
    .attr('transform',(d, i) => `translate(${i== 0 ? 15: i*7},0)`) 
    
 const _ayMaxWind =   SVG?.selectAll('text:nth-of-type(2)')
 .data(data)
 .join('text')
 .text(function(d,i){
     //console.log({ayMin:d.ayMin});
     
     return `${d.max}` 
     //`${d.souraNb}-${d.ayMin}`
    })
 .attr('x', (d, i ) => _xScale(d.min)   )
 .attr('y', function(d,i ){
     return yScale(d.souraNb) +17 
     }) 
    .style('fill',(d ) => colorScale(d.souraNb)) 
     .style('font-size','7px')
     .style('font-weight','light')
     .attr('transform',(d, i) => `translate(${i== 0 ? 15: i*7},0)`) 
    
    //   .attr('transform','rotate(45)')

      //  console.log({_svgWindow, _ayMinWind, scalPo: scalePow().exponent()});
 
const _yAxisLeft = axisLeft(yScale)
const _displayYAxisG = SVG.select('g')
                .attr('id','yAxisLeftG')
               .attr('transform','translate(30,0)')    
             //   .attr('margin', '10')
               _yAxisLeft(_displayYAxisG)

}catch(error) {
console.log({error});

}}
const drawMathani = ({
    SVG,
    order, 
    data
}:{
    SVG:Selection<BaseType, unknown, HTMLElement, any> | ElementType,
    order:OrderEnum
    data:StatsTemplateType[]
}) => {
    console.log({data});
    try {
        const _souraNb = data.map((wind)=> wind.souraNb )
        const WIND_max = data.map((wind)=> wind.max )
        const WIND_min = data.map((wind)=> wind.min )
        const souraNbArr = [...new Set(_souraNb)];

    const SVG_WIDTH = select(SVG).node().clientWidth 
    const SVG_HIGHT = select(SVG).node().clientHeight
    const WINDOW_LENGTH = data.length
     const WINDOW_AY_MAX = Math.max(...WIND_max)
     const WINDOW_AY_MIN = Math.min(...WIND_min)
     console.log({SVG_WIDTH,SVG_HIGHT, WINDOW_LENGTH, WINDOW_AY_MAX , WINDOW_AY_MIN, souraNbArr});
     /* 
 SVG.on('click' ,  (e, d) => {
    //return null // 
      console.log({ pointers:pointers(e), d});
  }) */
  const _xScale = scaleLinear()
                    .domain([WINDOW_AY_MIN,WINDOW_AY_MAX ])
                    .rangeRound([margin.left, boundedWidth]).clamp(true)
  const xScale = scaleBand()
                    .domain([WINDOW_AY_MIN,WINDOW_AY_MAX ])
                    .range([margin.left, boundedWidth])
                    //.clamp(true)

                    const _xticks =   _xScale.ticks(100) 
console.log({WINDOW_AY_MIN,WINDOW_AY_MAX });

const yScale = scaleLinear()
                .domain([Math.max(...souraNbArr),Math.min(...souraNbArr) ])
                .rangeRound([ boundedHeight, margin.top])
                .clamp(true)
    const _yScale = scalePoint()
                .domain([Math.min(...souraNbArr),Math.max(...souraNbArr) ])
                .rangeRound([margin.top, boundedHeight])
               // .clamp(true)
       //d3.interpolateRdYlBu         
   // const colorScale =scaleOrdinal([Math.min(...souraNbArr),Math.max(...souraNbArr) ], schemeCategory10).unknown(null)  
   // const _colorScale =scaleLinear([Math.min(...souraNbArr),Math.max(...souraNbArr) ], ['blue', "orange"])
   // const colorScale1 =scaleSequental([Math.min(...souraNbArr),Math.max(...souraNbArr) ], ['blue', "orange"]).interpolator(interpolateRainbow)
   // .unknown(null).clamp(true)  
  //.interpolate(interpolateHclLong)
    SVG.attr('viewBox', `0 0 ${width} ${height}`).style('background-color', 'rgb(240,240,240)')
     const _svgWindow = SVG?.selectAll('rect')
                .data(data, async function(d, i ,n){
                    return d})
                .join('rect')
                .attr('width',function(d, i ){
                    return (d.max - d.min )

                        })
                .attr('height', function(d){
                    return 8
                })
                .attr('x', function(d, i){
                  //  console.log({ min:d.min});
                    return _xScale(d.min) + i * 2 
                }).attr('transform','translate(-27,-10)')
                .attr('y', function(d, i){
                    //console.log({ souraNb:d.souraNb, scal: _yScale(d.souraNb)});
                    return yScale(d.souraNb) 
                         //_yScale(d.souraNb)  
                    })
                    .attr('fill', (d ) => colorScale(d.souraNb))
                    .attr('rx', '2')
                    .attr('ry', '2')
                    .attr('transform','translate(10,0)') 
  
 const _ayMinWind =   SVG?.selectAll('text')
.data(data)
.join('text')
.text(function(d,i, n){
        console.log({dMaxMIN: d.max - d.min});
        
        return `${d.min}`
  //`${d.souraNb}-${d.ayMin}`
   })
.attr('x', (d, i ) => _xScale(d.min)   )
.attr('y', function(d,i ){
    return yScale(d.souraNb) 
    }) 
    .style('fill',(d ) => colorScale(d.souraNb)) 
    .style('font-size','7px')
    .style('font-weight','light')
    .attr('transform',(d, i) => `translate(${i== 0 ? 15: i*7},0)`) 
    
 const _ayMaxWind =   SVG?.selectAll('text:nth-of-type(2)')
 .data(data)
 .join('text')
 .text(function(d,i){
     //console.log({ayMin:d.ayMin});
     
     return `${d.max}` 
     //`${d.souraNb}-${d.ayMin}`
    })
 .attr('x', (d, i ) => _xScale(d.min)   )
 .attr('y', function(d,i ){
     return yScale(d.souraNb) +17 
     }) 
    .style('fill',(d ) => colorScale(d.souraNb)) 
     .style('font-size','7px')
     .style('font-weight','light')
     .attr('transform',(d, i) => `translate(${i== 0 ? 15: i*7},0)`) 
 
const _yAxisLeft = axisLeft(yScale)
const _displayYAxisG = SVG.select('g')
                .attr('id','yAxisLeftG')
               .attr('transform','translate(30,0)')    
             //   .attr('margin', '10')
               _yAxisLeft(_displayYAxisG)

}catch(error) {
console.log({error});

}}
const drawMofasalTawil = ({
    SVG,
    order, 
    data
}:{
    SVG:Selection<BaseType, unknown, HTMLElement, any> | ElementType,
    order:OrderEnum
    data:StatsTemplateType[]
}) => {
    console.log({data});
    try {
        const _souraNb = data.map((wind)=> wind.souraNb )
        const WIND_max = data.map((wind)=> wind.max )
        const WIND_min = data.map((wind)=> wind.min )
        const souraNbArr = [...new Set(_souraNb)];

    const SVG_WIDTH = select(SVG).node().clientWidth 
    const SVG_HIGHT = select(SVG).node().clientHeight
    const WINDOW_LENGTH = data.length
     const WINDOW_AY_MAX = Math.max(...WIND_max)
     const WINDOW_AY_MIN = Math.min(...WIND_min)
     console.log({SVG_WIDTH,SVG_HIGHT, WINDOW_LENGTH, WINDOW_AY_MAX , WINDOW_AY_MIN, souraNbArr});
     /* 
 SVG.on('click' ,  (e, d) => {
    //return null // 
      console.log({ pointers:pointers(e), d});
  }) */
  const _xScale = scaleLinear()
                    .domain([WINDOW_AY_MIN,WINDOW_AY_MAX ])
                    .rangeRound([margin.left, boundedWidth]).clamp(true)
  const xScale = scaleBand()
                    .domain([WINDOW_AY_MIN,WINDOW_AY_MAX ])
                    .range([margin.left, boundedWidth])
                    //.clamp(true)

                    const _xticks =   _xScale.ticks(100) 
console.log({WINDOW_AY_MIN,WINDOW_AY_MAX });

const yScale = scaleLinear()
                .domain([Math.max(...souraNbArr),Math.min(...souraNbArr) ])
                .rangeRound([ boundedHeight, margin.top])
                .clamp(true)
    const _yScale = scalePoint()
                .domain([Math.min(...souraNbArr),Math.max(...souraNbArr) ])
                .rangeRound([margin.top, boundedHeight])
    //.interpolate(interpolateHclLong)
    SVG.attr('viewBox', `0 0 ${width} ${height}`).style('background-color', 'rgb(240,240,240)')
     const _svgWindow = SVG?.selectAll('rect')
                .data(data, async function(d, i ,n){
                    return d})
                .join('rect')
                .attr('width',function(d, i ){
                    return (d.max - d.min )
                       })
                .attr('height', function(d){
                    return 8
                })
                .attr('x', function(d, i){
                  //  console.log({ min:d.min});
                    return _xScale(d.min) + i * 2 
                }).attr('transform','translate(-27,-10)')
                .attr('y', function(d, i){
                    //console.log({ souraNb:d.souraNb, scal: _yScale(d.souraNb)});
                    return yScale(d.souraNb) 
                         //_yScale(d.souraNb)  
                    })
                    .attr('fill', (d ) => colorScale(d.souraNb))
                    .attr('rx', '2')
                    .attr('ry', '2')
                    .attr('transform','translate(10,0)') 
 const _ayMinWind =   SVG?.selectAll('text')
.data(data)
.join('text')
.text(function(d,i, n){
        console.log({dMaxMIN: d.max - d.min});
        
        return `${d.min}`
  //`${d.souraNb}-${d.ayMin}`
   })
.attr('x', (d, i ) => _xScale(d.min)   )
.attr('y', function(d,i ){
    return yScale(d.souraNb) 
    }) 
    .style('fill',(d ) => colorScale(d.souraNb)) 
    .style('font-size','7px')
    .style('font-weight','light')
    .attr('transform',(d, i) => `translate(${i== 0 ? 15: i*7},0)`) 
    
 const _ayMaxWind =   SVG?.selectAll('text:nth-of-type(2)')
 .data(data)
 .join('text')
 .text(function(d,i){
     //console.log({ayMin:d.ayMin});
     
     return `${d.max}` 
     //`${d.souraNb}-${d.ayMin}`
    })
 .attr('x', (d, i ) => _xScale(d.min)   )
 .attr('y', function(d,i ){
     return yScale(d.souraNb) +17 
     }) 
    .style('fill',(d ) => colorScale(d.souraNb)) 
     .style('font-size','7px')
     .style('font-weight','light')
     .attr('transform',(d, i) => `translate(${i== 0 ? 15: i*7},0)`) 
 
const _yAxisLeft = axisLeft(yScale)
const _displayYAxisG = SVG.select('g')
                .attr('id','yAxisLeftG')
               .attr('transform','translate(30,0)')    
             //   .attr('margin', '10')
               _yAxisLeft(_displayYAxisG)
}catch(error) {
console.log({error});

}}
const drawMofasalAwsat = ({
    SVG,
    order, 
    data
}:{
    SVG:Selection<BaseType, unknown, HTMLElement, any> | ElementType,
    order:OrderEnum
    data:StatsTemplateType[]
}) => {
    console.log({data});
    try {
        const _souraNb = data.map((wind)=> wind.souraNb )
        const WIND_max = data.map((wind)=> wind.max )
        const WIND_min = data.map((wind)=> wind.min )
        const souraNbArr = [...new Set(_souraNb)];

    const SVG_WIDTH = select(SVG).node().clientWidth 
    const SVG_HIGHT = select(SVG).node().clientHeight
    const WINDOW_LENGTH = data.length
     const WINDOW_AY_MAX = Math.max(...WIND_max)
     const WINDOW_AY_MIN = Math.min(...WIND_min)
     console.log({SVG_WIDTH,SVG_HIGHT, WINDOW_LENGTH, WINDOW_AY_MAX , WINDOW_AY_MIN, souraNbArr});
     /* 
 SVG.on('click' ,  (e, d) => {
    //return null // 
      console.log({ pointers:pointers(e), d});
  }) */
  const _xScale = scaleLinear()
                    .domain([WINDOW_AY_MIN,WINDOW_AY_MAX ])
                    .rangeRound([margin.left, boundedWidth]).clamp(true)
  
                    const _xticks =   _xScale.ticks(100) 
console.log({WINDOW_AY_MIN,WINDOW_AY_MAX });

const yScale = scaleLinear()
                .domain([Math.max(...souraNbArr),Math.min(...souraNbArr) ])
                .rangeRound([ boundedHeight, margin.top])
                .clamp(true)
    const _yScale = scalePoint()
                .domain([Math.min(...souraNbArr),Math.max(...souraNbArr) ])
                .rangeRound([margin.top, boundedHeight])
               // .clamp(true)
 
    SVG.attr('viewBox', `0 0 ${width} ${height}`).style('background-color', 'rgb(240,240,240)')
     const _svgWindow = SVG?.selectAll('rect')
                .data(data, async function(d, i ,n){
                    return d})
                .join('rect')
                .attr('width',function(d, i ){
                    return (d.max - d.min )

                        })
                .attr('height', function(d){
                    return 8
                })
                .attr('x', function(d, i){
                  console.log({ min:d.min, xScal1:_xScale(d.min)});
                    return _xScale(d.min) + i * 2 
                }).attr('transform','translate(-27,-10)')
                .attr('y', function(d, i){
                    //console.log({ souraNb:d.souraNb, scal: _yScale(d.souraNb)});
                    return yScale(d.souraNb) 
                         //_yScale(d.souraNb)  
                    })
                    .attr('fill', (d ) => colorScale(d.souraNb))
                    .attr('rx', '2')
                    .attr('ry', '2')
                    .attr('transform','translate(10,0)') 
 
     const _ayMinWind =   SVG?.selectAll('text')
.data(data)
.join('text')
.text(function(d,i, n){
        console.log({dMaxMIN: d.max - d.min});
        
        return `${d.min}`
  //`${d.souraNb}-${d.ayMin}`
   })
.attr('x', (d, i ) => _xScale(d.min)   )
.attr('y', function(d,i ){
    return yScale(d.souraNb) 
    }) 
    .style('fill',(d ) => colorScale(d.souraNb)) 
    .style('font-size','7px')
    .style('font-weight','light')
    .attr('transform',(d, i) => `translate(${i== 0 ? 15: i*7},0)`) 
    
 const _ayMaxWind =   SVG?.selectAll('text:nth-of-type(2)')
 .data(data)
 .join('text')
 .text(function(d,i){
     //console.log({ayMin:d.ayMin});
     
     return `${d.max}` 
     //`${d.souraNb}-${d.ayMin}`
    })
 .attr('x', (d, i ) => _xScale(d.min)   )
 .attr('y', function(d,i ){
     return yScale(d.souraNb) +17 
     }) 
    .style('fill',(d ) => colorScale(d.souraNb)) 
     .style('font-size','7px')
     .style('font-weight','light')
     .attr('transform',(d, i) => `translate(${i== 0 ? 15: i*7},0)`) 
    
    //   .attr('transform','rotate(45)')

      //  console.log({_svgWindow, _ayMinWind, scalPo: scalePow().exponent()});
 
const _yAxisLeft = axisLeft(yScale)
const _displayYAxisG = SVG.select('g')
                .attr('id','yAxisLeftG')
               .attr('transform','translate(30,0)')    
             //   .attr('margin', '10')
               _yAxisLeft(_displayYAxisG)

}catch(error) {
console.log({error});

}}
const drawMofasalKisar= ({
    SVG,
    order, 
    data
}:{
    SVG:Selection<BaseType, unknown, HTMLElement, any> | ElementType,
    order:OrderEnum
    data:StatsTemplateType[]
}) => {
    console.log({data});
    try {
        const _souraNb = data.map((wind)=> wind.souraNb )
        const WIND_max = data.map((wind)=> wind.max )
        const WIND_min = data.map((wind)=> wind.min )
        const souraNbArr = [...new Set(_souraNb)];
        
        const SVG_WIDTH = select(SVG).node().clientWidth 
        const SVG_HIGHT = select(SVG).node().clientHeight
        const WINDOW_LENGTH = data.length
        const WINDOW_AY_MAX = Math.max(...WIND_max)
        const WINDOW_AY_MIN = Math.min(...WIND_min)
         /* 
 SVG.on('click' ,  (e, d) => {
    //return null // 
      console.log({ pointers:pointers(e), d});
  }) */
  const _xScale = scaleLinear()
                    .domain([WINDOW_AY_MIN,WINDOW_AY_MAX ])
                    .rangeRound([0, boundedWidth]).clamp(true)

                    const _xticks =   _xScale.ticks(100) 
console.log({WINDOW_AY_MIN,WINDOW_AY_MAX });

const yScale = scaleLinear()
                .domain([Math.max(...souraNbArr),Math.min(...souraNbArr) ])
                .rangeRound([ boundedHeight, margin.top])
                .clamp(true)
    const _yScale = scalePoint()
                .domain([Math.min(...souraNbArr),Math.max(...souraNbArr) ])
                .rangeRound([margin.top, boundedHeight])
               // .clamp(true)
  //.interpolate(interpolateHclLong)
    SVG.attr('viewBox', `0 0 ${width} ${height}`).style('background-color', 'rgb(240,240,240)')
     const _svgWindow = SVG?.selectAll('rect')
                .data(data, async function(d, i ,n){
                    return d})
                .join('rect')
                .attr('width',function(d, i ){
                    return (d.max - d.min )
                        })
                .attr('height', function(d){
                    return 8
                })
                .attr('x', function(d, i){
                  //  console.log({ min:d.min});
                    return _xScale(d.min) + i * 2 
                }).attr('transform','translate(-27,-10)')
                .attr('y', function(d, i){
                    //console.log({ souraNb:d.souraNb, scal: _yScale(d.souraNb)});
                    return yScale(d.souraNb) 
                         //_yScale(d.souraNb)  
                    })
                    .attr('fill', (d ) => colorScale(d.souraNb))
                    .attr('rx', '2')
                    .attr('ry', '2')
                    .attr('transform','translate(10,0)') 
 
 const _ayMinWind =   SVG?.selectAll('text')
.data(data)
.join('text')
.text(function(d,i, n){
        console.log({dMaxMIN: d.max - d.min});
        
        return `${d.min}`
  //`${d.souraNb}-${d.ayMin}`
   })
.attr('x', (d, i ) => _xScale(d.min)   )
.attr('y', function(d,i ){
    return yScale(d.souraNb) 
    }) 
    .style('fill',(d ) => colorScale(d.souraNb)) 
    .style('font-size','7px')
    .style('font-weight','light')
    .attr('transform',(d, i) => `translate(${i== 0 ? 15: i*7},0)`) 
    
 const _ayMaxWind =   SVG?.selectAll('text:nth-of-type(2)')
 .data(data)
 .join('text')
 .text(function(d,i){
     //console.log({ayMin:d.ayMin});
     
     return `${d.max}` 
     //`${d.souraNb}-${d.ayMin}`
    })
 .attr('x', (d, i ) => _xScale(d.min)   )
 .attr('y', function(d,i ){
     return yScale(d.souraNb) +17 
     }) 
    .style('fill',(d ) => colorScale(d.souraNb)) 
     .style('font-size','7px')
     .style('font-weight','light')
     .attr('transform',(d, i) => `translate(${i== 0 ? 15: i*7},0)`) 
    //   .attr('transform','rotate(45)')
     //  console.log({_svgWindow, _ayMinWind, scalPo: scalePow().exponent()});
 
const _yAxisLeft = axisLeft(yScale)
const _displayYAxisG = SVG.select('g')
                .attr('id','yAxisLeftG')
               .attr('transform','translate(30,0)')    
             //   .attr('margin', '10')
               _yAxisLeft(_displayYAxisG)

}catch(error) {
console.log({error});

}}

function TemplateSouarPanoramic() {
    const dispatch = useDispatch()
   const {pending} =   useFormStatus()
    const { insightTemplate, statsTemplateContext,insightTemplateAyahsSelected} = useSelector((state: RootStateType) => state.stage)
    const {  setGridsStaged, setStatsTemplateContext } = stageActions
   const svgTiwal = useRef();
   const svgMiin = useRef();
   const svgMathani = useRef();
   const svgMofasalTawil = useRef();
   const svgMofasalAwsat = useRef();
   const svgMofasalKisar = useRef();
const [order, setOrder] = useState(() => OrderEnum.ASC);
function ascHandler() {
  setOrder(OrderEnum.ASC)
}

function descHandler() {
  setOrder(OrderEnum.DESC)
}
const [statZoom, setStatZoom] = useState({min:0, max:100});


 async function getStat() {
    try {
        const _statResp = await getStatTaysir({min:statZoom.min, max:statZoom.max}) 
        if(_statResp && _statResp.success) {
           const _stats= await JSON.parse(_statResp.message)
            console.log({_stats});
            dispatch(setStatsTemplateContext({stats:_stats}))
        } else if(!_statResp.success) {
        toast.warning(`something went wrong ${error}`)

        }  
    }catch(error) {
        toast.warning(`something went wrong ${error}`)
    }
} 
useEffect(() => {
    if(typeof statsTemplateContext !== 'undefined' && statsTemplateContext){
    const _svgTiwal =  select(svgTiwal.current!)
    const _svgMiin =  select(svgMiin.current!)
    const _svgMathani =  select(svgMathani.current!)
    const _svgMofasalTawil =  select(svgMofasalTawil.current!)
    const _svgMofasalAwsat =  select(svgMofasalAwsat.current!)
    const _svgMofasalKisar =  select(svgMofasalKisar.current!)
    
    console.log({
        width: document?.querySelector('svg')?.clientWidth,
        hight: document?.querySelector('svg')?.clientHeight,
    });
    console.log({statsTemplateContext});
    
    const  _dataTiwal = statsTemplateContext.filter((wiAy)=> wiAy.souraNb < 8)
        drawTiwal({SVG:_svgTiwal, order, data:_dataTiwal  })
        console.log({_dataTiwal});
    
    const  _dataMiin = statsTemplateContext.filter((wiAy)=> wiAy.souraNb < 19 && wiAy.souraNb>7 )
        drawMiin({SVG:_svgMiin, order, data:_dataMiin  })
        console.log({_dataMiin});

    const  _dataMathani = statsTemplateContext.filter((wiAy)=> wiAy.souraNb < 49 && wiAy.souraNb>18 )
    console.log({_dataMathani});
       
    drawMathani({SVG:_svgMathani, order, data:_dataMathani  })

    const  _dataMofasalTawil = statsTemplateContext.filter((wiAy)=> wiAy.souraNb < 80 && wiAy.souraNb>48 )
    console.log({_dataMofasalTawil});
        
    drawMofasalTawil({SVG:_svgMofasalTawil, order, data:_dataMofasalTawil  })
    
    const  _dataMofasalAwsat = statsTemplateContext.filter((wiAy)=> wiAy.souraNb < 93 && wiAy.souraNb>=80 )
    console.log({_dataMofasalAwsat});
        
    drawMofasalAwsat({SVG:_svgMofasalAwsat, order, data:_dataMofasalAwsat  })
    
    const  _dataMofasalKisar = statsTemplateContext.filter((wiAy)=>  wiAy.souraNb>=93 )
    console.log({_dataMofasalKisar});
    
    drawMofasalKisar({SVG:_svgMofasalKisar, order, data:_dataMofasalKisar  })
    }

    }, [statsTemplateContext]);
console.log({width, height});

    return (<div className={`flex-col h-full border-2 border-blue-400 rounded-md  justify-start p-2  space-y-2 items-stretch w-full`} >
               <div className="flex justify-evenly items-center ">
                <SpaceButton disabled={false} handlePress={descHandler} title='Desc' />
                <SpaceButton disabled={false} handlePress={ascHandler} title='Asc ' />
                <SpaceButton disabled={pending} handlePress={getStat} title='Get Stats' />
            </div>
        <div className="grid grid-cols-2 grid-flow-row h-full p-2 justify-start items-stretch border-2 border-violet-500  
        gap-3">
        <div className="flex  col-span-1 justify-center items-center ">
            <svg ref={svgTiwal!}   >
            <g > 
            <rect /> 
            </g> 
            </svg>
        </div>
        <div className="flex col-span-1  justify-center items-center ">
            <svg ref={svgMiin!}   >
            <g > 
            <rect /> 
            </g> 
            </svg>
        </div>
        
        <div className="flex col-span-1 justify-evenly items-center ">
            <svg ref={svgMathani!}   >
            <g > 
            <rect /> 
            </g> 
            </svg>
        </div>
        
        <div className="flex col-span-1 justify-evenly items-center ">
            <svg ref={svgMofasalTawil!}   >
            <g > 
            <rect /> 
              </g> 
            </svg>
        </div>

        <div className="flex col-span-1 justify-evenly items-center ">
            <svg ref={svgMofasalAwsat!}   >
            <g > 
            <rect /> 
             </g> 
            </svg>
        </div>
        
        <div className="flex col-span-1 justify-evenly items-center ">
            <svg ref={svgMofasalKisar!}   >
            <g > 
            <rect /> 
             </g> 
            </svg>
        </div>
    </div>
    </div>
    
    )
    }

export default memo(TemplateSouarPanoramic);
