'use client'
import { Ayah, StatsTemplateType } from '@/app/api/graphql/stage/stage.types';
import { stageActions } from "@/store/slices/stageSlice";
import { RootStateType } from '@/store/store';
import { cn } from '@/lib/cn-utility'
import _ from 'lodash';
import { ElementRef, ElementType, memo, ReactNode, use, useEffect, useRef, useState, useTransition } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import SpaceButton from './SpaceButton';
import { useFormState, useFormStatus } from 'react-dom';
import { select, BaseType,} from "d3";
let planetData = [
    {
      name: 'Mercury',
      diameter: 4879,
      density: 5427,
      color: 'green'
    },
    {
      name: 'Venus',
      diameter: 12104,
      density: 5243,
      color: 'purple'
    },
    {
      name: 'Earth',
      diameter: 12756,
      density: 5514,
      color: 'dodgerblue'
    },
    {
      name: 'Mars',
      diameter: 6792,
      density: 3933,
      color: 'indianred'
    },
    {
      name: 'Jupiter',
      diameter: 142984,
      density: 1326,
      color: 'gold'
    },
    {
      name: 'Saturn',
      diameter: 120536,
      density: 687,
      color: 'navy'
    },
    {
      name: 'Uranus',
      diameter: 51118,
      density: 1271,
      color: 'thistle'
    },
    {
      name: 'Neptune',
      diameter: 49528,
      density: 1638,
      color: 'pink'
    },
    {
      name: 'Pluto',
      diameter: 2370,
      density: 2095,
      color: 'brown'
    }
  ];
const dimentions = {
    width:1700,
    height:550,
    margin :{
        top:20,
        right:20,
        bottom:20,
        left:60,}}

const {height, margin, width } = dimentions
const boundedWidth = width - margin.right
const boundedHeight = height - margin.bottom

enum OrderEnum { 
    ASC ='ASC',
    DESC =  'DESC'
}
const drawChart = ({
    SVG,order, 
}:{
    SVG:Selection<BaseType, unknown, HTMLElement, any> | ElementType,
    order:OrderEnum
}) => {
   
const _mapPlanets = planetData.map(p  => p)
console.log({_mapPlanets});
try {
    let cxValue = 0
const _svg = SVG?.selectAll('circle')
.data(_mapPlanets, async function(d){
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

    return this
}).join('circle').attr('r', d => Number(d.diameter / 1000)).attr('cy', 150).attr('cx', (d, i, n) => {
    if(i === 0) {
        cxValue= Number(d.diameter / 1000)
    }else {
       const prevRadius = Number(select(n[i -1]).attr('r'))
    cxValue = cxValue + prevRadius + d.diameter / 1000
    }
    return ( 75 * (i + 1) + cxValue )
}).style('fill', d  => d.color)
console.log({_svg});

const _textName =   SVG?.selectAll('text')
.data(_mapPlanets, async function(d){
    return d?.name
}).join('text').attr('x', (d, i, n) => _svg['_groups'][0][i].getAttribute('cx')).attr('y', (d, i,) => {
    console.log({dText:d});
    return i%2==0? '330' : '15' }).text((d) => `${d.name}-${d.diameter}`).style('text-anchor', 'middle')
    .style('fill', 'rgb(100,63,63)')
    .style('font-size','15px')
    .style('font-weight','bold')
} catch (error) {
    console.log({error});
}
  
}
const drawDensity = ({
    SVG,order, 
}:{
    SVG:Selection<BaseType, unknown, HTMLElement, any> | ElementType,
    order:OrderEnum
}) => {
   
const _mapPlanets = planetData.map(p  => p)
console.log({_mapPlanets});
try {
  const _svgRect = SVG?.selectAll('rect')
.data(_mapPlanets, async function(d){
    return d?.name
}) .order((a,b) => {return order == OrderEnum.ASC ? Number(a?.density) - Number(b.density): Number(b.density) - Number(a.density)})
    .join('rect')
    .attr('width', d => Number(d.density / 10))
    .attr('height', '30')
    .attr('y', (d, i) => {
        return i*40
    })
    .attr('x', '10')
    .style('fill', d  => d.color)
console.log({_svgRect});

const _textName =   SVG?.selectAll('text')
.data(_mapPlanets, async function(d){
    console.log({inText:d});
    
    return d?.name
}).join('text')
.attr('x', (d, i) => d.density / 10 + 20)
.attr('y', (d, i,) => {
    return (i*40) +20 
})
.text((d) => {
        console.log({dText:`${d.name}-${d.density}`});

        return `${d.name}-${d.density}`})
    .style('text-anchor', 'start')
    .style('fill', 'rgb(63,63,63)')
    .style('font-size','20px')
    .style('font-weight','bold')
    console.log(_textName);
    
} catch (error) {
    console.log({error});
}
  
}

 
function PlanetDistribution() {

  //  const [isPending, startTransition] = useTransition()
   const {pending} =   useFormStatus()
    const { guestPrisma } = useSelector((state: RootStateType) => state.guestPrisma)
 
const svgRef = useRef();
const densityRef = useRef();
const [order, setOrder] = useState(() => OrderEnum.ASC);
function ascHandler() {
  setOrder(OrderEnum.ASC)
}

function descHandler() {
  setOrder(OrderEnum.DESC)
}
useEffect(() => {
  getPlanets()
// eslint-disable-next-line react-hooks/exhaustive-deps
}, [order]);

async function getPlanets() {
    console.log({order});
    
        drawChart({SVG:select(svgRef.current), order })
 }
 async function getPlanetsDensity() {
    console.log({order});
    
        drawDensity({SVG:select(densityRef.current), order })
 }  
    return <div className={`flex  border-2 border-blue-400 rounded-md flex-col justify-start p-2  space-y-2 items-stretch w-full`} >
      
                <div className="flex justify-evenly items-center ">
            
            <SpaceButton disabled={false} handlePress={descHandler} title='Desc' />
            <SpaceButton disabled={false} handlePress={ascHandler} title='Asc ' />
            <SpaceButton disabled={pending} handlePress={getPlanets} title='Get Planets' />
            <SpaceButton disabled={pending} handlePress={getPlanetsDensity} title='Get Density' />
        </div>
        <h1 className="text-green-700 text-center"> Solar System Planets
        </h1>

        <div className=" flex-col justify-between overflow-scroll items-stretch  space-y-2">

        <div className=" flex-col justify-start overflow-scroll items-stretch  space-y-2">
        <svg ref={svgRef!} viewBox={`0 0 ${width} ${height}`}  >
        
        <circle />
        <text />
         
        </svg>
        </div>

        <div className=" flex-col justify-start overflow-scroll items-stretch  space-y-2 border-1 border-blue-400   ">
        
        <svg ref={densityRef!} viewBox={`0 700 ${width} ${height}`}  >
        
        <rect />
        <text />
         
        </svg>
        </div>

            </div>
    </div>}

export default memo(PlanetDistribution);
