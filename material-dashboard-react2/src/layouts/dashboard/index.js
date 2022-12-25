/**
=========================================================
* Material Dashboard 2 React - v2.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// @mui material components
import Grid from "@mui/material/Grid";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import { Icon } from "@mui/material";
import HomeWorkIcon from "@mui/icons-material/HomeWork";
import ApartmentIcon from "@mui/icons-material/Apartment";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import ReportsBarChart from "examples/Charts/BarCharts/ReportsBarChart";
import ReportsLineChart from "examples/Charts/LineCharts/ReportsLineChart";
import ComplexStatisticsCard from "examples/Cards/StatisticsCards/ComplexStatisticsCard";

// Data
import reportsBarChartData from "layouts/dashboard/data/reportsBarChartData";
import reportsLineChartData from "layouts/dashboard/data/reportsLineChartData";

// Dashboard components
import Projects from "layouts/dashboard/components/Projects";
import OrdersOverview from "layouts/dashboard/components/OrdersOverview";

// Project Data
import { useEffect, useState } from "react";
import axios from "axios";
import Spinner from "layouts/Style/Spinner";
import Spinner2 from "layouts/Style/Spinner2";
import list from "assets/theme/components/list";

function Dashboard() {
  const { sales, tasks } = reportsLineChartData;
  const [loading, setLoading] = useState(true);
  const [allData, setAllData] = useState("");

  useEffect(() => {
    const loadAllData = async () => {
      const response1 = await axios.get(
        `http://127.0.0.1:8080/web-scraping/openapi/loadYearlyRentDashboard`
      );

      // const response2 = await axios.get(
      //   `http://127.0.0.1:8080/web-scraping/openapi/loadYearlyRentDashboard2`
      // );

      setAllData({
        yearlyRentAllCount: response1.data,
        // yearlyRentChartData: response2.data,
      });
      setLoading(false);
    };
    loadAllData();
  }, []);

  return (
    <div>
      {loading ? (
        <Spinner2 />
      ) : (
        <DashboardLayout>
          <br />
          <MDBox>
            <MDTypography variant="h5">
              <Icon>chat</Icon>&nbsp;&nbsp;2022년 서울 부동산 정보
            </MDTypography>
          </MDBox>
          <br />
          <MDBox py={3}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6} lg={3}>
                <MDBox mb={1.5}>
                  <ComplexStatisticsCard
                    color="dark"
                    icon="homeworkicon"
                    title="전세 총 거래량"
                    count={`${allData.yearlyRentAllCount.dataCount}건`}
                    percentage={{
                      label: "2022년 서울 기준",
                    }}
                  />
                </MDBox>
              </Grid>
              <Grid item xs={12} md={6} lg={3}>
                <MDBox mb={1.5}>
                  <ComplexStatisticsCard
                    color="dark"
                    icon="homeworkicon"
                    title="Today's Users"
                    count="2,300"
                    percentage={{
                      color: "success",
                      amount: "+3%",
                      label: "than last month",
                    }}
                  />
                </MDBox>
              </Grid>
              <Grid item xs={12} md={6} lg={3}>
                <MDBox mb={1.5}>
                  <ComplexStatisticsCard
                    color="dark"
                    icon="apartmenticon"
                    title="Revenue"
                    count="34k"
                    percentage={{
                      color: "success",
                      amount: "+1%",
                      label: "than yesterday",
                    }}
                  />
                </MDBox>
              </Grid>
              <Grid item xs={12} md={6} lg={3}>
                <MDBox mb={1.5}>
                  <ComplexStatisticsCard
                    color="dark"
                    icon="apartmenticon"
                    title="Followers"
                    count="+91"
                    percentage={{
                      color: "success",
                      amount: "",
                      label: "Just updated",
                    }}
                  />
                </MDBox>
              </Grid>
            </Grid>
            <MDBox mt={4.5}>
              <Grid container spacing={3}>
                <Grid item xs={12} md={6} lg={4}>
                  <MDBox mb={3}>
                    <ReportsBarChart
                      color="info"
                      title="website views"
                      description="Last Campaign Performance"
                      date="campaign sent 2 days ago"
                      chart={reportsBarChartData([
                        // allData.yearlyRentChartData.numberData1,
                        // allData.yearlyRentChartData.numberData2,
                        // allData.yearlyRentChartData.numberData3,
                        // allData.yearlyRentChartData.numberData4,
                        // allData.yearlyRentChartData.numberData5,
                      ])}
                    />
                  </MDBox>
                </Grid>
                <Grid item xs={12} md={6} lg={4}>
                  <MDBox mb={3}>
                    <ReportsLineChart
                      color="info"
                      title="daily sales"
                      description={
                        <>
                          (<strong>+15%</strong>) increase in today sales.
                        </>
                      }
                      date="updated 4 min ago"
                      chart={sales}
                    />
                  </MDBox>
                </Grid>
                <Grid item xs={12} md={6} lg={4}>
                  <MDBox mb={3}>
                    <ReportsLineChart
                      color="info"
                      title="completed tasks"
                      description="Last Campaign Performance"
                      date="just updated"
                      chart={tasks}
                    />
                  </MDBox>
                </Grid>
              </Grid>
            </MDBox>
            <MDBox>
              <Grid container spacing={3}>
                <Grid item xs={12} md={6} lg={8}>
                  <Projects />
                </Grid>
                <Grid item xs={12} md={6} lg={4}>
                  <OrdersOverview />
                </Grid>
              </Grid>
            </MDBox>
          </MDBox>
        </DashboardLayout>
      )}
    </div>
  );
}

export default Dashboard;
