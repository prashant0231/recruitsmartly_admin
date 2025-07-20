declare namespace ApiResponse {
  export interface LoginResponse {
    access_token: string;
    token_type: string;
    user: {
      email: string;
      name: string;
      company_name: string;
      id: string;
      role: string;
      is_active: boolean;
      google_drive_folder_id: string;
    };
  }
  // Root type
  export interface OrganizationResponse {
    results: Organization[];
    pagination: Pagination;
  }

  // Pagination details
  export interface Pagination {
    total_records: number;
    current_page: number;
    page_size: number;
    total_pages: number;
  }

  // Organization-level data
  export interface Organization {
    organization_id: string;
    organization_name: string;
    active_status: boolean;
    created_at: string | null;
    updated_at: string | null;
    total_token_count: number;
    job_description_details: JobDescription[];
    statistics: Statistics;
    latest_jd_added: string | null;
    latest_resume_added: string | null;
    time_period: TimePeriod;
  }

  // Job description per organization
  export interface JobDescription {
    jd_id: string;
    jd_title: string;
    jd_created_by: string | null;
    resumes_count: number;
    scan_count: number;
    rescan_count: number;
  }

  // Statistics summary
  export interface Statistics {
    total_jds: number;
    total_documents: number;
    total_evaluations: number;
  }

  // Time period (can be null)
  export interface TimePeriod {
    start_date: string | null;
    end_date: string | null;
  }
}
