import { useEffect } from "react";

import "./dashboard.scss";

import { Chart, registerables } from "chart.js";
Chart.register(...registerables);

export default function DashBoard() {
  // tạo biểu đồ
  function handleChart(params, type) {
    new Chart(params, {
      type: `${type}`,
      data: {
        labels: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"],
        datasets: [
          {
            label: "Doanh thu từng tháng",
            data: [12, 19, 3, 5, 2, 3, 12, 19, 3, 5, 2, 18],
            backgroundColor: ["rgba(255, 99, 132, 0.2)"],
            borderColor: ["rgba(255, 99, 132, 1)"],
            borderWidth: 1,
            fill: true,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  }

  useEffect(() => {
    const lineChart = document.getElementById("myChart-line").getContext("2d");
    const barChart = document.getElementById("myChart-bar").getContext("2d");
    let lineChartSt = Chart.getChart("myChart-line");
    let barChartSt = Chart.getChart("myChart-bar");
    if (lineChartSt != undefined) {
      lineChartSt.destroy();
    }
    if (barChartSt != undefined) {
      barChartSt.destroy();
    }
    handleChart(lineChart, "line");
    handleChart(barChart, "bar");
  }, []);

  console.log("Home dashboard re-render");
  return (
    <>
      <div id="admin_dashboar--statistical">
        <div className="admin_dashboar--statistical--title">
          <h1>Thống kê</h1>
        </div>
        <div className="admin_dashboar--statistical--item">
          <div
            className="admin_statistical-item"
            style={{ backgroundColor: "#0D6EFD" }}
          >
            <span className="_statistical--title">Tổng doanh thu</span>
            <span className="_statistical--values">100.000.000đ / năm</span>
          </div>
          <div
            className="admin_statistical-item"
            style={{ backgroundColor: "#FFC107" }}
          >
            <span className="_statistical--title">Đơn trong kho</span>
            <span className="_statistical--values">10.000 đơn</span>
          </div>
          <div
            className="admin_statistical-item"
            style={{ backgroundColor: "#198754" }}
          >
            <span className="_statistical--title">Đơn đã bán</span>
            <span className="_statistical--values">12.000 đơn</span>
          </div>

          <div
            className="admin_statistical-item"
            style={{ backgroundColor: "#DC3545" }}
          >
            <span className="_statistical--title">Đơn chưa xử lý</span>
            <span className="_statistical--values">2.000 đơn</span>
          </div>
        </div>
      </div>
      <div id="admin_dashboar--statistical-chart">
        <div className="admin_dashboar--statistical-chart-item">
          <div className="chart_title">
            <span>
              <ion-icon name="bar-chart"></ion-icon>
              Biểu đồ đường
            </span>
          </div>
          <div className="chart">
            <canvas id="myChart-line"></canvas>
          </div>
        </div>
        <div className="admin_dashboar--statistical-chart-item">
          <div className="chart_title">
            <span>
              <ion-icon name="stats-chart"></ion-icon>
              Biểu đồ cột
            </span>
          </div>
          <div className="chart">
            <canvas id="myChart-bar"></canvas>
          </div>
        </div>
      </div>
    </>
  );
}
