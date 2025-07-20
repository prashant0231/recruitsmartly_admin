"use client";

import HorizontalScroll from "@/components/HorizontalScroll";
import NoDatFound from "@/components/NoDataFound";
import ScrollButton from "@/components/ScrollButton";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { useAppSelector } from "@/hooks/useAppSelector";
import { fetchDashboardDetails } from "@/redux/slices/dashboard/dashboardSlice";
import {
  BookTextIcon,
  Briefcase,
  Building,
  Check,
  Eye,
  FileTextIcon,
  Info,
  User,
  BarChart3,
  UserCircle2,
  FileText,
  RefreshCw,
} from "lucide-react";
import React, { useEffect, useRef, useState } from "react";

type OrganizationProps = ApiResponse.Organization;

export default function DashboardPage() {
  const dispatch = useAppDispatch();
  const { token } = useAppSelector((s) => s.auth);

  const [dashboardData, setDashboardData] = useState<OrganizationProps[]>([]);
  const [selectedOrg, setSelectedOrg] = useState<OrganizationProps | null>(
    null
  );
  const [selectedJob, setSelectedJob] = useState<any>(null);

  const organizationClick = (i: number) => {
    setSelectedOrg(dashboardData[i]);
    handleJobClick(dashboardData[i].job_description_details[0]);
  };

  const handleJobClick = (job: any) => {
    setSelectedJob(job);
  };

  const fetchDashboardDetailsApi = async () => {
    try {
      const res = await dispatch(fetchDashboardDetails()).unwrap();

      const orgData = res.results;
      setDashboardData(orgData || []);
      organizationClick(0);
      if (orgData.length > 0) {
        organizationClick(0);
        handleJobClick(orgData[0]);
      }
    } catch (error) {}
  };

  useEffect(() => {
    fetchDashboardDetailsApi();
  }, [token]);

  return (
    <div className="flex-1 p-4 sm:p-6 space-y-6 bg-gray-50 min-h-screen ">
      <OrganizationSelector
        organizations={dashboardData}
        selectedOrg={selectedOrg}
        setSelectedOrg={organizationClick}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        <MetricCard
          title="Job Description"
          value={selectedOrg?.statistics.total_jds || 0}
          sub="+12% from last month"
          icon={<FileTextIcon className="w-6 h-6 text-indigo-600" />}
        />
        <MetricCard
          title="Resumes"
          value={selectedOrg?.statistics.total_documents || 0}
          sub="80% of total"
          icon={<BookTextIcon className="w-6 h-6 text-indigo-600" />}
        />
        <MetricCard
          title="AI Scanned"
          value={selectedOrg?.statistics.total_evaluations || 0}
          sub="4.6% selection rate"
          icon={<Eye className="w-6 h-6 text-indigo-600" />}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4 gap-2">
        <ActiveJobsList
          selectedOrg={selectedOrg}
          selectedJob={selectedJob}
          handleJobClick={handleJobClick}
          NoDatFound={NoDatFound}
        />
        {selectedJob && <JobInsightsCard job={selectedJob} />}
      </div>
    </div>
  );
}

const MetricCard = ({ title, value, sub, icon }: any) => (
  <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm relative">
    <div className="absolute top-4 right-4 text-gray-400">{icon}</div>
    <p className="text-sm font-medium text-black">{title}</p>
    <p className="text-2xl lg:text-3xl font-bold mt-1">{value}</p>
    <p className="text-sm text-gray-500 mt-1">{sub}</p>
  </div>
);

const OrganizationSelector = ({
  organizations,
  selectedOrg,
  setSelectedOrg,
}: any) => {
  const scrollRef = React.useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = React.useState(false);
  const [canScrollRight, setCanScrollRight] = React.useState(false);

  const updateScrollButtons = () => {
    const container = scrollRef.current;
    if (!container) return;
    setCanScrollLeft(container.scrollLeft > 0);
    setCanScrollRight(
      container.scrollLeft + container.clientWidth < container.scrollWidth
    );
  };

  React.useEffect(() => {
    updateScrollButtons();
    const container = scrollRef.current;
    if (!container) return;
    container.addEventListener("scroll", updateScrollButtons);
    return () => {
      container.removeEventListener("scroll", updateScrollButtons);
    };
  }, [organizations]);

  const scrollBy = (amount: number) => {
    const container = scrollRef.current;
    if (!container) return;
    container.scrollBy({ left: amount, behavior: "smooth" });
  };

  return (
    <div className="rounded-lg border border-gray-200 shadow-sm p-4 relative w-full">
      <div className="flex items-center gap-2 mb-4">
        <div className="w-6 h-6 bg-indigo-50 rounded flex items-center justify-center">
          <Building className="w-5 h-5 text-black" />
        </div>
        <h2 className="text-lg font-semibold text-gray-900">
          Select Organization
        </h2>
      </div>
      <ScrollButton
        direction="left"
        canScroll={canScrollLeft}
        scrollBy={scrollBy}
        organizationsLength={organizations.length}
      />
      <ScrollButton
        direction="right"
        canScroll={canScrollRight}
        scrollBy={scrollBy}
        organizationsLength={organizations.length}
      />
      <div
        ref={scrollRef}
        className="flex items-center space-x-3  overflow-x-auto mx-8  pb-2 scrollbar-hide"
        style={{ overscrollBehaviorX: "contain", touchAction: "pan-y" }}
      >
        {organizations.map((org: any, i: number) => {
          const isSelected =
            selectedOrg?.organization_id === org.organization_id;
          return (
            <div
              key={org.organization_id}
              className={`min-w-[280px] sm:min-w-[300px] md:min-w-[320px] p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 flex-shrink-0 ${
                isSelected
                  ? "bg-indigo-50 border-indigo-500 shadow-md"
                  : "bg-white border-gray-200 hover:border-indigo-300 hover:shadow-sm"
              }`}
              onClick={() => setSelectedOrg(i)}
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-start gap-3">
                  <div
                    className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                      isSelected ? "bg-indigo-100" : "bg-gray-100"
                    }`}
                  >
                    <span
                      className={`text-sm font-bold ${
                        isSelected ? "text-indigo-600" : "text-gray-600"
                      }`}
                    >
                      {org.organization_name.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <div>
                    <h3
                      className={`font-semibold text-sm ${
                        isSelected ? "text-indigo-900" : "text-gray-900"
                      }`}
                    >
                      {org.organization_name}
                    </h3>
                    <span
                      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${
                        org.active_status
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      <div
                        className={`w-1.5 h-1.5 rounded-full ${
                          org.active_status ? "bg-green-500" : "bg-red-500"
                        }`}
                      ></div>
                      {org.active_status ? "Active" : "Inactive"}
                    </span>
                  </div>
                </div>
                {isSelected && (
                  <div className="flex items-center gap-1 bg-indigo-100 text-indigo-700 px-2 py-0 rounded-full">
                    <Check className="w-5 h-5" />
                    <span className="text-xs font-medium">Selected</span>
                  </div>
                )}
              </div>
              <div className="flex gap-4 text-xs text-gray-600">
                <div className="flex items-center gap-1">
                  <User className="w-3 h-3" />
                  <span>{0} Users</span>
                </div>
                <div className="flex items-center gap-1">
                  <Briefcase className="w-3 h-3" />
                  <span>{org.statistics.total_jds} Jobs</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="mt-3 p-2 bg-blue-50 rounded-md">
        <div className="flex items-center gap-2">
          <Info className="w-3 h-3" />
          <p className="text-xs text-blue-800">
            <strong>Tip:</strong> Click on an organization to view its dashboard
            and analytics
          </p>
        </div>
      </div>
    </div>
  );
};

const ActiveJobsList = ({
  selectedOrg,
  selectedJob,
  handleJobClick,
  NoDatFound,
}: any) => {
  const jobs = selectedOrg?.job_description_details ?? [];
  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-md p-6 flex flex-col gap-4 w-full lg:max-w-[300px] pb-6">
      <h3 className="text-lg font-semibold ml-4">Active Jobs</h3>
      <div className="space-y-2 max-h-[170px] min-h-20 overflow-y-auto scrollbar-thin-custom">
        {jobs.length === 0 ? (
          <div className="mt-6">
            <NoDatFound message="No Job description found!!" />
          </div>
        ) : (
          jobs.map((job: any, i: number) => {
            const isSelected = selectedJob?.jd_id === job.jd_id;
            return (
              <button
                key={i}
                className={`block w-full text-left px-4 py-2 rounded-md border ${
                  isSelected
                    ? "bg-indigo-500 text-white"
                    : "bg-white text-black"
                }`}
                onClick={() => handleJobClick(job)}
              >
                {job.jd_title}
                <div
                  className={`$${
                    isSelected ? "text-white" : "text-gray-500"
                  } text-sm`}
                >
                  {job.resumes_count} applications
                </div>
              </button>
            );
          })
        )}
      </div>
    </div>
  );
};

const JobInsightsCard = ({ job }: { job: any }) => {
  if (!job) return null;
  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-md p-6 flex flex-col gap-4 w-full lg:max-w-[300px] pb-6">
      <div className="flex items-center gap-3 mb-2">
        <BarChart3 className="w-7 h-7 text-indigo-600" />
        <div>
          <h3 className="text-lg font-bold text-gray-900">{job.jd_title}</h3>
          <p className="text-xs text-gray-500">
            Created by -{" "}
            <span className="font-medium text-indigo-700">
              {job.jd_created_by || "NA"}
            </span>
          </p>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-4 mt-2">
        <div className="flex flex-col items-center">
          <FileText className="w-6 h-6 text-blue-500 mb-1" />
          <span className="text-xl font-bold">{job.resumes_count}</span>
          <span className="text-xs text-gray-500">Resumes</span>
        </div>
        <div className="flex flex-col items-center">
          <UserCircle2 className="w-6 h-6 text-green-500 mb-1" />
          <span className="text-xl font-bold">{job.scan_count}</span>
          <span className="text-xs text-gray-500">AI Scanned</span>
        </div>
        <div className="flex flex-col items-center">
          <RefreshCw className="w-6 h-6 text-orange-500 mb-1" />
          <span className="text-xl font-bold">{job.rescan_count}</span>
          <span className="text-xs text-gray-500">Re-Scans</span>
        </div>
      </div>
      <div className="mt-2 border-t pt-4 text-center">
        <span className="text-xs text-gray-400 tracking-wide">
          Job Insights
        </span>
      </div>
    </div>
  );
};

const organizations = [
  {
    id: "1",
    name: "SinghAndSons",
    active: true,
    jobs: 1,
    users: 0,
  },
  {
    id: "2",
    name: "Offical_dev_test",
    active: true,
    jobs: 21,
    users: 0,
  },
  {
    id: "3",
    name: "Recruitsmartly_dev",
    active: true,
    jobs: 3,
    users: 0,
  },
  {
    id: "4",
    name: "Acme Corp",
    active: false,
    jobs: 0,
    users: 5,
  },
];

function OrganizationScroller() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const updateScrollButtons = () => {
    const container = scrollRef.current;
    if (!container) return;
    setCanScrollLeft(container.scrollLeft > 0);
    setCanScrollRight(
      container.scrollLeft + container.clientWidth < container.scrollWidth
    );
  };

  useEffect(() => {
    updateScrollButtons();
    const container = scrollRef.current;
    if (!container) return;
    container.addEventListener("scroll", updateScrollButtons);
    return () => {
      container.removeEventListener("scroll", updateScrollButtons);
    };
  }, []);

  const scrollBy = (amount: number) => {
    scrollRef.current?.scrollBy({ left: amount, behavior: "smooth" });
  };

  return (
    <div className="bg-white border rounded-xl p-6 shadow-sm relative w-full max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex items-center gap-2 mb-4">
        <Building className="w-5 h-5 text-indigo-600" />
        <h2 className="text-lg font-semibold text-gray-900">
          Select Organization
        </h2>
      </div>

      {/* Scroll Buttons */}
      {canScrollLeft && (
        <button
          className="absolute top-[45%] left-2 z-10 bg-gray-100 hover:bg-gray-200 rounded-full p-2 shadow"
          onClick={() => scrollBy(-300)}
        >
          <span className="text-xl">←</span>
        </button>
      )}
      {canScrollRight && (
        <button
          className="absolute top-[45%] right-2 z-10 bg-gray-100 hover:bg-gray-200 rounded-full p-2 shadow"
          onClick={() => scrollBy(300)}
        >
          <span className="text-xl">→</span>
        </button>
      )}

      {/* Scrollable Cards */}
      <div
        ref={scrollRef}
        className="flex space-x-4 overflow-x-auto scrollbar-hide py-2"
        style={{ scrollBehavior: "smooth" }}
      >
        {organizations.map((org) => (
          <div
            key={org.id}
            className="min-w-[280px] bg-white border rounded-lg p-4 flex-shrink-0 shadow hover:shadow-md transition-all"
          >
            <div className="flex items-start justify-between mb-2">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center">
                  <span className="text-sm font-bold text-gray-600">
                    {org.name.charAt(0).toUpperCase()}
                  </span>
                </div>
                <div>
                  <h3 className="font-semibold text-sm text-gray-900">
                    {org.name}
                  </h3>
                  <span
                    className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${
                      org.active
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    <div
                      className={`w-1.5 h-1.5 rounded-full ${
                        org.active ? "bg-green-500" : "bg-red-500"
                      }`}
                    ></div>
                    {org.active ? "Active" : "Inactive"}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex gap-4 text-xs text-gray-600 mt-2">
              <div className="flex items-center gap-1">
                <User className="w-3 h-3" />
                <span>{org.users} Users</span>
              </div>
              <div className="flex items-center gap-1">
                <Briefcase className="w-3 h-3" />
                <span>{org.jobs} Jobs</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Tip Section */}
      <div className="mt-4 p-3 bg-blue-50 rounded-md flex items-start gap-2">
        <Info className="w-4 h-4 text-blue-600 mt-0.5" />
        <p className="text-sm text-blue-900">
          <strong>Tip:</strong> Click on an organization to view its dashboard
          and analytics
        </p>
      </div>
    </div>
  );
}

{
  /* Candidates */
}
{
  /* <div className="md:col-span-3 space-y-4 bg-white p-5 rounded-lg border border-gray-200 min-w-[300px] max-w-[740px]">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">Candidates</h3>
            <div className="flex gap-2">
              <button className="px-3 py-1 border rounded flex items-center gap-2">
                <Filter className="w-4 h-4" />
                Filter
              </button>
              <button className="px-3 py-1 border rounded flex items-center gap-2">
                <Upload className="w-4 h-4" />
                Upload Resume
              </button>
            </div>
          </div>
          <div className="space-y-4">
            {mockData.candidates.map((c, i) => (
              <div
                key={i}
                className="bg-white p-4 rounded-lg shadow flex justify-between items-start"
              >
                <div>
                  <p className="font-semibold">{c.name}</p>
                  <p className="text-sm text-gray-500">{c.email}</p>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {c.skills.map((skill, j) => (
                      <span
                        key={j}
                        className="px-2 py-1 rounded text-xs font-medium bg-blue-100 text-blue-800"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="text-right space-y-2">
                  <p className="font-semibold text-sm">{c.match}% match</p>
                  <p className="text-sm">{c.ctc}</p>
                  <p
                    className={`text-xs px-2 py-1 rounded-full inline-block ${
                      c.status.includes("round")
                        ? "bg-orange-100 text-orange-700"
                        : "bg-green-100 text-green-700"
                    }`}
                  >
                    {c.status}
                  </p>
                  <button className="text-indigo-600 text-sm underline">
                    Email
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div> */
}
