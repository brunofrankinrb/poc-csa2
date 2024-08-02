"use client";

import { FC, useEffect, useRef } from "react";
import * as d3 from "d3";

const colors = {
  male: {
    selected: "fill-blue-300",
    default: "fill-blue-100",
  },
  female: {
    selected: "fill-fuchsia-300",
    default: "fill-fuchsia-100",
  },
  noEnergy: {
    selected: "fill-gray-300",
    default: "fill-gray-100",
  },
};

const totalWidth = 1152,
  barHeight = 50;

type Payload = {
  currentTime: number;
  data: Data[];
};

type Data = {
  start: number;
  end: number;
  type: "male" | "female" | "noEnergy";
};

const buildGraph = (payload: Payload) => {
  const scaleFactor = totalWidth / payload.data[payload.data.length - 1].end;
  const data = payload.data;
  const width = data[data.length - 1].end * scaleFactor;
  const lineData = [payload.currentTime];
  const graph = d3
    .select(".timeline")
    .attr("width", width)
    .attr("height", barHeight);

  const bar = graph.selectAll("g").data(data);

  bar
    .join("g")
    //.append("g")
    .attr("transform", function (d) {
      return "translate(" + d.start * scaleFactor + ",0)";
    })
    .append("rect")
    .attr("width", function (d) {
      return (d.end - d.start) * scaleFactor;
    })
    .attr("height", barHeight - 1)
    .attr("class", (d) => {
      const selected =
        payload.currentTime >= d.start && payload.currentTime <= d.end
          ? "selected"
          : "default";
      return colors[d.type][selected];
    })
    .on("click", (_, d) => {
      console.log("click", d);
    });

  bar
    .append("text")
    .attr("x", (d) => {
      const width = (d.end - d.start) * scaleFactor;
      return width / 2 - (d.type === "male" ? 20 : 30);
    })
    .attr("y", barHeight / 2)
    .attr("dy", ".35em")
    .attr("fill", (d) => {
      const selected =
        payload.currentTime >= d.start && payload.currentTime < d.end;
      if (selected) return "#FFFFFF";
      else return "#000000";
    })
    .text((d) => {
      return "";
    });

  const line = graph
    .selectAll("line")
    .data(lineData)
    .join("line")
    .attr("x1", payload.currentTime * scaleFactor)
    .attr("y1", 0)
    .attr("x2", payload.currentTime * scaleFactor)
    .attr("y2", barHeight)
    .attr("stroke", "black")
    .attr("stroke-width", "4");
};

export type TimelineProps = {
  currentTime: number;
};

const Timeline: FC<TimelineProps> = ({ currentTime }) => {
  const ref = useRef<SVGSVGElement>(null);
  useEffect(() => {
    console.log("buildGraph", currentTime);
    buildGraph({
      currentTime,
      data: [
        {
          start: 0.0,
          end: 54.6,
          type: "male",
        },
        {
          start: 54.6,
          end: 55.22,
          type: "noEnergy",
        },
        {
          start: 55.22,
          end: 60,
          type: "male",
        },
      ],
    });
  }, [currentTime]);

  return (
    <div className="mt-5">
      <svg className="timeline" ref={ref} width="300" height="100">
        {/* <line x1="0" y1="0" x2="0" y2="50" stroke="black" strokeWidth="4" /> */}
      </svg>
    </div>
    // <div style={{display: 'flex'}}>
    //     <div style={{border: '1px solid black', width: '20px', height: '30px'}}></div>
    //     <div style={{border: '1px solid black', width: '20px', height: '30px'}}></div>
    //     <div style={{border: '1px solid black', width: '20px', height: '30px'}}></div>
    //     <div style={{border: '1px solid black', width: '20px', height: '30px'}}></div>
    // </div>
  );
};

export default Timeline;
