import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import "chartjs-adapter-date-fns";
import { enUS } from "date-fns/locale";

const Graph = (props) => {
  const [rawData, setRawData] = useState([]);
  useEffect(() => {
    fetch("/api/v1/projects/1/comments")
      .then((res) => res.json())
      .then((data) => {
        setRawData(data);
      });
  }, []);
  const datasets = rawData.map((keyword) => {
    return {
      label: keyword.searchTerm,
      data: keyword.Comments.map((comment) => {
        const commentData = JSON.parse(comment.data);
        const sentimentData = JSON.parse(comment.sentiment);
        return {
          x: commentData.created_utc * 1000,
          y: sentimentData.score,
        };
      })
      .sort((a, b) => a.x > b.x ? -1 : 1),
    };
  });
  console.log(datasets)
  if (datasets.length === 0) {
    return ''
  }
  return (
    <div>
      <Line
        data={{
          datasets
        }}
        height={400}
        width={600}
        options={{
          maintainAspectRatio: false,
          adapters: {
            date: {
              locale: enUS,
            },
          },
          ticks: {
            source: 'auto'
          },
          scales: {
            x: {
              type: "time",
              time: {
                unit: "minute",
              }
            },
          },
        }}
      />
    </div>
  );
};
export default Graph;
