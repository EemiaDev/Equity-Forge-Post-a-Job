
export type Screen = 'dashboard' | 'jobs' | 'post-job';

export interface JobFormData {
  // Step 1: Details
  jobTitle: string;
  department: string;
  experienceLevel: string;
  jobType: 'Full-time' | 'Part-time' | 'Contract' | '';
  workLocation: string[]; // ['Remote', 'Onsite', 'Hybrid']
  description: string;
  
  // Step 2: Compensation
  compensationType: string;
  commitmentExpectation: string;
  commitmentDuration: string;
  fmvType: 'Pay range' | 'Exact amount';
  minFmv: string;
  maxFmv: string;
  fmvFrequency: string;
  exactFmv: string;

  // Step 3: Settings
  expirationDate: string;
  sendConfirmation: boolean;
  confirmationEmailPreview: string;
  sendRejection: boolean;
  rejectionEmailPreview: string;
}

export const initialFormData: JobFormData = {
  jobTitle: '',
  department: '',
  experienceLevel: '',
  jobType: '',
  workLocation: [],
  description: '',
  compensationType: '',
  commitmentExpectation: '',
  commitmentDuration: '',
  fmvType: 'Pay range',
  minFmv: '',
  maxFmv: '',
  fmvFrequency: '',
  exactFmv: '',
  expirationDate: '2026-03-21',
  sendConfirmation: true,
  confirmationEmailPreview: '',
  sendRejection: false,
  rejectionEmailPreview: ''
};

export const EMAIL_TEMPLATES = {
  confirmation: `Thank you for your interest in our [Job Title] role at [Company Name]! We have received your application and our team will review it promptly. If your skills and experience align with the requirements of the position, we will be in touch with you soon. Regards, [Company Name]`,
  rejection: `Thank you for taking the time to apply for the [Job Title] position at [Company Name] and for your interest in joining our team. After careful consideration of your application, we regret to inform you that we will not be moving forward with your candidacy at this time. This decision was not easy, as we received a high number of qualified applications. We truly appreciate the effort you put into your application and the opportunity to learn more about your background. Regards, [Company Name]`
};
