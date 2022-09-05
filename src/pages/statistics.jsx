import { Component, useEffect, useState } from "react"
import axios from "axios"
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js"
import { Line } from "react-chartjs-2"
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend)

export const Statistics = (props) => {
    const [info, setinfo] = useState(null)
    useEffect(() => {
        getBCData()
    })
    const getBCData = async () => {
        const { data: dataPrice } = await axios.get(
            `https://api.blockchain.info/charts/market-price?timespan=5months&format=json&cors=true`
        )
        const { data: tradeVol } = await axios.get(
            `https://api.blockchain.info/charts/trade-volume?timespan=5months&format=json&cors=true`
        )
        const { data: avgBlockSize } = await axios.get(
            `https://api.blockchain.info/charts/avg-block-size?timespan=5months&format=json&cors=true`
        )
        let labels = dataPrice.values.map(({ x }) => {
            const timeStamp=new Date(x*1000)
            return timeStamp.toLocaleDateString()
        })
        const dataPriceInfo = {
            labels,
            datasets: [
                {
                    label: "data Price Info",
                    data: dataPrice.values.map(({ y }) => y),
                    backgroundColor: "rgba(255, 299, 132, 1)",
                },
            ],
        }
        labels = tradeVol.values.map(({ x }) => {
            const timeStamp=new Date(x*1000)
            return timeStamp.toLocaleDateString()
        })
        const tradeVolInfo = {
            labels,
            datasets: [
                {
                    label: "trade Vol Info",
                    data: tradeVol.values.map(({ y }) => y),
                    backgroundColor: "rgba(255, 199, 132, 1)",
                },
            ],
        }
        labels = dataPrice.values.map(({ x }) => {
            const timeStamp=new Date(x*1000)
            return timeStamp.toLocaleDateString()
        })
        const avgBlockSizeInfo = {
            labels,
            datasets: [
                {
                    label: "avg Block Size Info",
                    data: avgBlockSize.values.map(({ y }) => y),
                    backgroundColor: "rgba(155, 99, 132, 1)",
                },
            ],
        }
        setinfo({
            dataPriceInfo,
            tradeVolInfo,
            avgBlockSizeInfo,
        })
    }

    if (!info) return <div>Loading...</div>
    return (
        <div>
            <Line data={info.dataPriceInfo} />
            <Line data={info.tradeVolInfo} />
            <Line data={info.avgBlockSizeInfo} />
        </div>
    )
}
