import UsersOverviewOne from "./child/UsersOverviewOne";
import LatestRegisteredOne from "./child/LatestRegisteredOne";
import TopPerformerOne from "./child/TopPerformerOne";
import EarningStaticOne from "./child/EarningStaticOne";
import TopCountries from "./child/TopCountries";
import GeneratedContent from "./child/GeneratedContent";
import TotalIncome from "./child/TotalIncome";
import UnitCountOne from "./child/UnitCountOne";

const DashBoardLayerOne = () => {
  return (
    <>
      {/* UnitCountOne */}
      <UnitCountOne />

      <section className="row gy-4 mt-1">
        {/* EarningStaticOne */}
        <EarningStaticOne />

        {/* Financial Summary */}
        <TotalIncome columnClassName="col-xxl-5" />

        {/* UsersOverviewOne */}
        <UsersOverviewOne />

        {/* LatestRegisteredOne */}
        <LatestRegisteredOne />

        {/* TopPerformerOne */}
        <TopPerformerOne />

        {/* TopCountries */}
        <TopCountries />

        {/* GeneratedContent */}
        <GeneratedContent />
      </section>
    </>
  );
};

export default DashBoardLayerOne;
