import React from "react";
import { Line } from "react-chartjs-2"



const Graph = (props) => {
    const { data } = props;
    return (
        <div>
            <Line
                data={{
                    labels: ['Good', 'Bad', 'Happy', 'Sad', 'Glad', 'Mad'],
                    datasets: [
                        {
                            label: 'Keywords',
                            data: [12, 19, 3, 5, 2, 3],
                            backgroundColor: 'red'
                        }]
                }}
                height={400}
                width={600}
                options={{
                    maintainAspectRatio: false,
                }}
            />
        </div>
    )
}
export default Graph