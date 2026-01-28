
import React, { useState } from 'react';
import { StepIndicator } from '../components/StepIndicator';
import { JobFormData, initialFormData, Screen, EMAIL_TEMPLATES } from '../types';

const DESCRIPTION_TEMPLATE = `Role Summary

Consigo seeks a creative, detail-oriented Graphic Designer to support digital marketing, product imagery, and brand storytelling across our e-commerce channels.

Key Responsibilities

Designing product graphics and promotional assets
Creating social media visuals
Collaborating with marketing and product teams
Maintaining brand consistency across channels

Skills & Qualifications

Adobe Creative Suite (Photoshop, Illustrator, InDesign)
Digital illustration
E-commerce asset optimization
Typography and layout design
Experience with brand systems`;

const CONFIRMATION_EMAIL_TEMPLATE = `Thank you for your interest in our Graphic Designer role at Consigo!
We have received your application and our team will review it promptly. If your skills and experience align with the requirements of the position, we will be in touch with you soon.

Regards,
Consigo Talent Acquisition Team`;

export const PostJobFlow: React.FC<{ onComplete: () => void; setScreen: (s: Screen) => void }> = ({ onComplete, setScreen }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<JobFormData>(initialFormData);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isPosted, setIsPosted] = useState(false);

  const validateStep = () => {
    const newErrors: Record<string, string> = {};
    
    if (step === 1) {
      if (!formData.jobTitle.trim()) newErrors.jobTitle = "Job title is required.";
      if (!formData.department) newErrors.department = "Department is required.";
      if (!formData.experienceLevel) newErrors.experienceLevel = "Experience level is required.";
      if (!formData.jobType) newErrors.jobType = "Job type is required.";
      if (formData.workLocation.length === 0) newErrors.workLocation = "Work location is required.";
      if (!formData.description.trim()) newErrors.description = "Description is required.";
    } else if (step === 2) {
      if (!formData.compensationType) newErrors.compensationType = "Compensation type is required.";
    } else if (step === 3) {
      if (!formData.expirationDate) newErrors.expirationDate = "Expiration date is required.";
      if (!formData.confirmationEmailPreview.trim()) newErrors.confirmationEmailPreview = "Confirmation email is required.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep()) {
      setStep(s => Math.min(s + 1, 4));
      setErrors({});
    }
  };

  const updateField = (field: keyof JobFormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  const prevStep = () => {
    setStep(s => Math.max(s - 1, 1));
    setErrors({});
  };

  const ErrorMessage = ({ message }: { message?: string }) => {
    if (!message) return null;
    return (
      <div className="flex items-center gap-1.5 mt-2 text-red-600 animate-in fade-in slide-in-from-top-1 duration-200">
        <span className="material-symbols-outlined text-[18px] fill-1">error</span>
        <span className="text-[13px] font-medium">{message}</span>
      </div>
    );
  };

  if (isPosted) {
    return (
      <main className="flex-grow flex flex-col items-center py-16 px-4">
        <div className="max-w-4xl w-full">
          <h1 className="text-4xl font-bold mb-12 text-center md:text-left text-[#0F172A]">Post a Job</h1>
          <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl p-6 mb-12 shadow-sm">
            <div className="flex items-start gap-4">
              <span className="material-symbols-outlined text-green-600 text-3xl">check_circle</span>
              <div>
                <h2 className="text-lg font-semibold text-green-800 dark:text-green-300 mb-1">Job posted!</h2>
                <p className="text-green-700 dark:text-green-400 opacity-90">
                  Your {formData.jobTitle} role at Consigo was successfully created.
                </p>
              </div>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button onClick={() => setScreen('dashboard')} className="w-full sm:w-auto px-10 py-3.5 bg-white border border-slate-300 rounded-lg font-semibold text-slate-700 hover:bg-slate-50 transition-all">
              Go to dashboard
            </button>
            <button onClick={() => { setStep(1); setIsPosted(false); setFormData(initialFormData); setErrors({}); }} className="w-full sm:w-auto px-10 py-3.5 bg-primary text-white rounded-lg font-semibold hover:bg-blue-700 transition-all shadow-lg shadow-blue-500/20">
              Create another job
            </button>
          </div>
        </div>
      </main>
    );
  }

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
              <div>
                <label className="block text-[15px] font-bold text-[#0F172A] mb-2">Job title*</label>
                <input 
                  className={`w-full border rounded-lg focus:ring-primary focus:border-primary py-3 px-4 text-[15px] placeholder-[#94A3B8] text-black transition-colors ${errors.jobTitle ? 'border-red-500 bg-red-50/10' : 'border-gray-200'}`} 
                  value={formData.jobTitle}
                  onChange={(e) => updateField('jobTitle', e.target.value)}
                  placeholder="e.g. Graphic Designer" 
                />
                <ErrorMessage message={errors.jobTitle} />
              </div>
              <div>
                <label className="block text-[15px] font-bold text-[#0F172A] mb-2">Department*</label>
                <select 
                  className={`w-full border rounded-lg focus:ring-primary focus:border-primary py-3 px-4 text-[15px] transition-colors ${!formData.department ? 'text-[#94A3B8]' : 'text-black'} ${errors.department ? 'border-red-500 bg-red-50/10' : 'border-gray-200'}`}
                  value={formData.department}
                  onChange={(e) => updateField('department', e.target.value)}
                >
                  <option value="" disabled className="text-[#94A3B8]">Select department</option>
                  <option value="Design" className="text-black">Design</option>
                  <option value="Engineering" className="text-black">Engineering</option>
                  <option value="Product" className="text-black">Product</option>
                  <option value="Marketing" className="text-black">Marketing</option>
                </select>
                <ErrorMessage message={errors.department} />
              </div>
            </div>

            <div>
              <label className="block text-[15px] font-bold text-[#0F172A] mb-2">Experience Level *</label>
              <select 
                className={`w-full border rounded-lg focus:ring-primary focus:border-primary py-3 px-4 text-[15px] transition-colors ${!formData.experienceLevel ? 'text-[#94A3B8]' : 'text-black'} ${errors.experienceLevel ? 'border-red-500 bg-red-50/10' : 'border-gray-200'}`}
                value={formData.experienceLevel}
                onChange={(e) => updateField('experienceLevel', e.target.value)}
              >
                <option value="" disabled className="text-[#94A3B8]">Select experience level</option>
                <option value="Entry-Level" className="text-black">Entry-Level</option>
                <option value="Mid-Level" className="text-black">Mid-Level</option>
                <option value="Senior" className="text-black">Senior</option>
              </select>
              <ErrorMessage message={errors.experienceLevel} />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-8">
              <div>
                <label className="block text-[15px] font-bold text-[#0F172A] mb-4">Job type*</label>
                <div className="flex gap-8">
                  {['Full-time', 'Part-time', 'Contract'].map((type) => (
                    <label key={type} className="inline-flex items-center cursor-pointer group">
                      <input 
                        type="radio" 
                        name="job-type" 
                        className={`w-[18px] h-[18px] text-primary focus:ring-primary ${errors.jobType ? 'border-red-500' : 'border-gray-300'}`}
                        checked={formData.jobType === type}
                        onChange={() => updateField('jobType', type as any)}
                      />
                      <span className="ml-2 text-[15px] font-medium text-[#475569]">{type}</span>
                    </label>
                  ))}
                </div>
                <ErrorMessage message={errors.jobType} />
              </div>
              <div>
                <label className="block text-[15px] font-bold text-[#0F172A] mb-4">Work Location*</label>
                <div className="flex gap-8">
                  {['Remote', 'Onsite', 'Hybrid'].map((loc) => (
                    <label key={loc} className="inline-flex items-center cursor-pointer group">
                      <input 
                        type="checkbox" 
                        className={`w-[18px] h-[18px] rounded text-primary focus:ring-primary ${errors.workLocation ? 'border-red-500' : 'border-gray-300'}`}
                        checked={formData.workLocation.includes(loc)}
                        onChange={(e) => {
                          const newLocs = e.target.checked 
                            ? [...formData.workLocation, loc]
                            : formData.workLocation.filter(l => l !== loc);
                          updateField('workLocation', newLocs);
                        }}
                      />
                      <span className="ml-2 text-[15px] font-medium text-[#475569]">{loc}</span>
                    </label>
                  ))}
                </div>
                <ErrorMessage message={errors.workLocation} />
              </div>
            </div>

            <div>
              <label className="block text-[15px] font-bold text-[#0F172A] mb-2">Description*</label>
              <div className={`border rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-primary/20 transition-all ${errors.description ? 'border-red-500' : 'border-gray-200'}`}>
                <div className="flex items-center gap-4 px-4 py-2 border-b border-gray-100 bg-gray-50/50">
                   <button type="button" className="text-slate-600 hover:text-slate-900 font-bold px-1 transition-colors">B</button>
                   <button type="button" className="text-slate-600 hover:text-slate-900 italic px-1 transition-colors">/</button>
                   <button type="button" className="text-slate-600 hover:text-slate-900 px-1 transition-colors">
                     <span className="material-symbols-outlined text-[18px]">format_list_bulleted</span>
                   </button>
                   <div className="h-4 w-[1px] bg-gray-200 mx-1"></div>
                   <button type="button" className="text-slate-600 hover:text-slate-900 px-1 transition-colors">
                     <span className="material-symbols-outlined text-[18px]">link</span>
                   </button>
                </div>
                <textarea 
                  className="w-full border-none focus:ring-0 p-4 resize-none text-[15px] text-black leading-relaxed placeholder-[#94A3B8]" 
                  rows={12}
                  value={formData.description}
                  onChange={(e) => updateField('description', e.target.value)}
                  onFocus={() => {
                    if (!formData.description) {
                      updateField('description', DESCRIPTION_TEMPLATE);
                    }
                  }}
                  placeholder="Provide a detailed description of this role..."
                />
              </div>
              <ErrorMessage message={errors.description} />
            </div>
          </div>
        );
      case 2:
        return (
          <div className="space-y-6">
            <p className="text-[13px] text-[#94A3B8] italic mb-4">* indicates required field</p>
            
            <div className="space-y-6">
              <div>
                <label className="block text-[15px] font-bold text-[#0F172A] mb-2.5">Compensation type*</label>
                <div className="relative">
                  <select 
                    className={`w-full border rounded-lg focus:ring-primary focus:border-primary py-4 px-4 text-[15px] appearance-none bg-none transition-colors ${formData.compensationType === '' ? 'text-[#94A3B8]' : 'text-black'} ${errors.compensationType ? 'border-red-500 bg-red-50/10' : 'border-gray-200'}`}
                    value={formData.compensationType}
                    onChange={(e) => updateField('compensationType', e.target.value)}
                  >
                    <option value="" disabled className="text-[#94A3B8]">Select compensation type</option>
                    <option value="Cash" className="text-black">Cash</option>
                    <option value="Equity" className="text-black">Equity</option>
                    <option value="Hybrid (cash + equity)" className="text-black">Hybrid (cash + equity)</option>
                    <option value="Unpaid (This is a volunteering position)" className="text-black">Unpaid (This is a volunteering position)</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none text-slate-400">
                    <span className="material-symbols-outlined">expand_more</span>
                  </div>
                </div>
                <ErrorMessage message={errors.compensationType} />
              </div>

              {(formData.compensationType === 'Equity' || formData.compensationType === 'Hybrid (cash + equity)') && (
                <div className="space-y-8 pt-2 animate-in fade-in slide-in-from-top-4 duration-500">
                  <div className="h-[1px] bg-slate-100 mb-6"></div>
                  
                  <div>
                    <label className="block text-[15px] font-bold text-[#0F172A] mb-2.5">Commitment Expectation</label>
                    <input 
                      className="w-full border border-gray-200 rounded-lg focus:ring-primary focus:border-primary py-3.5 px-4 text-[15px] placeholder-[#94A3B8] text-black" 
                      placeholder="e.g 20 hours per week" 
                      value={formData.commitmentExpectation}
                      onChange={(e) => updateField('commitmentExpectation', e.target.value)}
                    />
                  </div>

                  <div>
                    <label className="block text-[15px] font-bold text-[#0F172A] mb-2.5">Commitment Duration</label>
                    <input 
                      className="w-full border border-gray-200 rounded-lg focus:ring-primary focus:border-primary py-3.5 px-4 text-[15px] placeholder-[#94A3B8] text-black" 
                      placeholder="e.g 3 months potential extension" 
                      value={formData.commitmentDuration}
                      onChange={(e) => updateField('commitmentDuration', e.target.value)}
                    />
                  </div>

                  <div className="pt-2">
                    <label className="block text-[15px] font-bold text-[#0F172A] mb-1">Fair market value (FMV)</label>
                    <p className="text-[13px] text-[#64748B] mb-6">We use fair market value as part of the formula for determining the equity allocation.</p>
                    
                    <div className="space-y-10">
                      <div className="space-y-4">
                        <label className="flex items-center gap-3 cursor-pointer group">
                          <input 
                            type="radio" 
                            name="fmv_type" 
                            checked={formData.fmvType === 'Pay range'} 
                            onChange={() => updateField('fmvType', 'Pay range')}
                            className="w-5 h-5 text-primary border-gray-300 focus:ring-primary cursor-pointer"
                          />
                          <span className="text-[15px] font-medium text-[#0F172A]">Pay range</span>
                        </label>
                        
                        <div className={`grid grid-cols-1 md:grid-cols-3 gap-6 pl-8 transition-opacity duration-200 ${formData.fmvType !== 'Pay range' ? 'opacity-40 pointer-events-none' : ''}`}>
                          <div className="space-y-2">
                            <label className="block text-[13px] font-bold text-[#475569]">Minimum FMV</label>
                            <div className="relative">
                              <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-[#94A3B8] text-[15px]">$</span>
                              <input 
                                className="w-full pl-8 border-gray-200 rounded-lg focus:ring-primary py-3.5 text-[15px] placeholder-[#94A3B8] text-black" 
                                placeholder="e.g 80,000" 
                                value={formData.minFmv}
                                onChange={(e) => updateField('minFmv', e.target.value)}
                              />
                            </div>
                          </div>
                          <div className="space-y-2">
                            <label className="block text-[13px] font-bold text-[#475569]">Maximum FMV</label>
                            <div className="relative">
                              <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-[#94A3B8] text-[15px]">$</span>
                              <input 
                                className="w-full pl-8 border-gray-200 rounded-lg focus:ring-primary py-3.5 text-[15px] placeholder-[#94A3B8] text-black" 
                                placeholder="e.g 120,000" 
                                value={formData.maxFmv}
                                onChange={(e) => updateField('maxFmv', e.target.value)}
                              />
                            </div>
                          </div>
                          <div className="space-y-2">
                            <label className="block text-[13px] font-bold text-[#475569]">Frequency</label>
                            <div className="relative">
                              <select 
                                className={`w-full border border-gray-200 rounded-lg focus:ring-primary py-3.5 px-4 text-[15px] appearance-none bg-none ${!formData.fmvFrequency ? 'text-[#94A3B8]' : 'text-black'}`}
                                value={formData.fmvFrequency}
                                onChange={(e) => updateField('fmvFrequency', e.target.value)}
                              >
                                <option value="" disabled className="text-[#94A3B8]">Select frequency</option>
                                <option value="Per year" className="text-black">Per year</option>
                                <option value="Per month" className="text-black">Per month</option>
                                <option value="Per hour" className="text-black">Per hour</option>
                              </select>
                              <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none text-slate-400">
                                <span className="material-symbols-outlined">expand_more</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <label className="flex items-center gap-3 cursor-pointer group">
                          <input 
                            type="radio" 
                            name="fmv_type" 
                            checked={formData.fmvType === 'Exact amount'} 
                            onChange={() => updateField('fmvType', 'Exact amount')}
                            className="w-5 h-5 text-primary border-gray-300 focus:ring-primary cursor-pointer"
                          />
                          <span className="text-[15px] font-medium text-[#0F172A]">Exact amount</span>
                        </label>
                        
                        <div className={`grid grid-cols-1 md:grid-cols-2 gap-6 pl-8 transition-opacity duration-200 ${formData.fmvType !== 'Exact amount' ? 'opacity-40 pointer-events-none' : ''}`}>
                          <div className="space-y-2">
                            <label className="block text-[13px] font-bold text-[#475569]">Amount in FMV</label>
                            <div className="relative">
                              <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-[#94A3B8] text-[15px]">$</span>
                              <input 
                                className="w-full pl-8 border-gray-200 rounded-lg focus:ring-primary py-3.5 text-[15px] placeholder-[#94A3B8] text-black" 
                                placeholder="e.g 80,000" 
                                value={formData.exactFmv}
                                onChange={(e) => updateField('exactFmv', e.target.value)}
                              />
                            </div>
                          </div>
                          <div className="space-y-2">
                            <label className="block text-[13px] font-bold text-[#475569]">Frequency</label>
                            <div className="relative">
                              <select 
                                className={`w-full border border-gray-200 rounded-lg focus:ring-primary py-3.5 px-4 text-[15px] appearance-none bg-none ${!formData.fmvFrequency ? 'text-[#94A3B8]' : 'text-black'}`}
                                value={formData.fmvFrequency}
                                onChange={(e) => updateField('fmvFrequency', e.target.value)}
                              >
                                <option value="" disabled className="text-[#94A3B8]">Select frequency</option>
                                <option value="Per year" className="text-black">Per year</option>
                                <option value="Per month" className="text-black">Per month</option>
                                <option value="Per hour" className="text-black">Per hour</option>
                              </select>
                              <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none text-slate-400">
                                <span className="material-symbols-outlined">expand_more</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        );
      case 3:
        return (
          <div className="space-y-10">
            <section>
              <label className="block text-sm font-bold mb-1 text-[#0F172A]">Set expiration date*</label>
              <p className="text-sm text-slate-500 mb-4">Set a date for when this job posting will automatically expire.</p>
              <div className="max-w-xs">
                <input 
                  type="date" 
                  className={`w-full rounded-lg text-sm focus:ring-primary py-2.5 text-black transition-colors ${errors.expirationDate ? 'border-red-500 bg-red-50/10' : 'border-slate-200'}`} 
                  value={formData.expirationDate}
                  onChange={(e) => updateField('expirationDate', e.target.value)}
                />
                <ErrorMessage message={errors.expirationDate} />
              </div>
              <p className="text-[11px] text-slate-400 mt-2">Note: Maximum expiration period is limited to 3 months.</p>
            </section>
            
            <section>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-sm font-bold text-[#0F172A]">Send confirmation emails*</label>
              </div>
              <p className="text-sm text-slate-500 mb-4">Applicants will receive this email immediately after application.</p>
              
              <div className={`border rounded-xl overflow-hidden shadow-sm transition-all ${errors.confirmationEmailPreview ? 'border-red-500' : 'border-gray-200'}`}>
                <div className="flex items-center gap-4 px-4 py-2 border-b border-gray-100 bg-gray-50/50">
                   <button type="button" className="text-slate-600 hover:text-slate-900 font-bold px-1 transition-colors">B</button>
                   <button type="button" className="text-slate-600 hover:text-slate-900 italic px-1 transition-colors">/</button>
                   <button type="button" className="text-slate-600 hover:text-slate-900 px-1 transition-colors">
                     <span className="material-symbols-outlined text-[18px]">format_list_bulleted</span>
                   </button>
                   <div className="h-4 w-[1px] bg-gray-200 mx-1"></div>
                   <button type="button" className="text-slate-600 hover:text-slate-900 px-1 transition-colors">
                     <span className="material-symbols-outlined text-[18px]">link</span>
                   </button>
                </div>
                <div className="p-5 bg-[#F8FAFF]">
                  <textarea 
                    className="w-full border-none focus:ring-0 p-0 bg-transparent resize-none text-[13px] text-slate-600 leading-relaxed placeholder-slate-400" 
                    rows={4}
                    value={formData.confirmationEmailPreview}
                    onChange={(e) => updateField('confirmationEmailPreview', e.target.value)}
                    onFocus={() => {
                      if (!formData.confirmationEmailPreview) {
                        updateField('confirmationEmailPreview', CONFIRMATION_EMAIL_TEMPLATE);
                      }
                    }}
                    placeholder={EMAIL_TEMPLATES.confirmation}
                  />
                </div>
              </div>
              <ErrorMessage message={errors.confirmationEmailPreview} />
            </section>

            <section>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-sm font-bold text-[#0F172A]">Send rejection emails</label>
                <button 
                  onClick={() => updateField('sendRejection', !formData.sendRejection)}
                  className={`relative inline-flex h-5 w-10 rounded-full border-2 border-transparent transition-colors ${formData.sendRejection ? 'bg-primary' : 'bg-slate-200'}`}
                >
                  <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${formData.sendRejection ? 'translate-x-5' : 'translate-x-0'}`}></span>
                </button>
              </div>
              <p className="text-sm text-slate-500 mb-4">Applicants will receive this email 48 hours after status change to "Rejected".</p>
              
              <div className={`border border-gray-200 rounded-xl overflow-hidden shadow-sm transition-opacity duration-300 ${!formData.sendRejection ? 'opacity-40 pointer-events-none grayscale-[0.5]' : ''}`}>
                <div className="flex items-center gap-4 px-4 py-2 border-b border-gray-100 bg-gray-50/50">
                   <button type="button" className="text-slate-600 hover:text-slate-900 font-bold px-1 transition-colors">B</button>
                   <button type="button" className="text-slate-600 hover:text-slate-900 italic px-1 transition-colors">/</button>
                   <button type="button" className="text-slate-600 hover:text-slate-900 px-1 transition-colors">
                     <span className="material-symbols-outlined text-[18px]">format_list_bulleted</span>
                   </button>
                   <div className="h-4 w-[1px] bg-gray-200 mx-1"></div>
                   <button type="button" className="text-slate-600 hover:text-slate-900 px-1 transition-colors">
                     <span className="material-symbols-outlined text-[18px]">link</span>
                   </button>
                </div>
                <div className="p-5 bg-[#F8FAFF]">
                  <textarea 
                    className="w-full border-none focus:ring-0 p-0 bg-transparent resize-none text-[13px] text-slate-600 leading-relaxed placeholder-slate-400" 
                    rows={6}
                    value={formData.rejectionEmailPreview}
                    onChange={(e) => updateField('rejectionEmailPreview', e.target.value)}
                    placeholder={EMAIL_TEMPLATES.rejection}
                  />
                </div>
              </div>
            </section>
          </div>
        );
      case 4:
        return (
          <div className="space-y-8">
            <section className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm text-black">
              <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                <h2 className="font-bold text-lg text-[#0F172A]">Job Details</h2>
                <button onClick={() => setStep(1)} className="text-primary text-sm font-medium flex items-center gap-1 hover:underline">
                  <span className="material-symbols-outlined text-[18px]">edit</span> Edit
                </button>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-y-8 gap-x-12 mb-8">
                  <div>
                    <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-1.5">Job Title</p>
                    <p className="text-[15px] font-medium text-black">{formData.jobTitle || 'Graphic Designer'}</p>
                  </div>
                  <div>
                    <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-1.5">Company</p>
                    <p className="text-[15px] font-medium text-black">Consigo</p>
                  </div>
                  <div>
                    <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-1.5">Department</p>
                    <p className="text-[15px] font-medium text-black">{formData.department || 'Design'}</p>
                  </div>
                  <div>
                    <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-1.5">Work Location</p>
                    <p className="text-[15px] font-medium text-black">{formData.workLocation.length > 0 ? formData.workLocation.join(', ') : 'Remote'}</p>
                  </div>
                  <div>
                    <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-1.5">Job Type</p>
                    <p className="text-[15px] font-medium text-black">{formData.jobType || 'Part-Time'}</p>
                  </div>
                  <div>
                    <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-1.5">Experience Level</p>
                    <p className="text-[15px] font-medium text-black">{formData.experienceLevel || 'Entry-Level'}</p>
                  </div>
                </div>
                <div className="border-t border-gray-100 pt-6">
                  <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-3">Description</p>
                  <div className="text-sm text-black leading-relaxed space-y-4">
                    <div className="whitespace-pre-wrap">{formData.description || DESCRIPTION_TEMPLATE}</div>
                  </div>
                </div>
              </div>
            </section>

            <section className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm text-black">
              <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                <h2 className="font-bold text-lg text-[#0F172A]">Compensation</h2>
                <button onClick={() => setStep(2)} className="text-primary text-sm font-medium flex items-center gap-1 hover:underline">
                  <span className="material-symbols-outlined text-[18px]">edit</span> Edit
                </button>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-y-8 gap-x-12">
                  <div>
                    <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-1.5">Compensation Type</p>
                    <p className="text-[15px] font-medium text-black">{formData.compensationType || 'Equity'}</p>
                  </div>
                  <div>
                    <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-1.5">Commitment Expectation</p>
                    <p className="text-[15px] font-medium text-black">{formData.commitmentExpectation || '20 hours per week'}</p>
                  </div>
                  <div>
                    <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-1.5">Commitment Duration</p>
                    <p className="text-[15px] font-medium text-black">{formData.commitmentDuration || '3 Months Potential Extension'}</p>
                  </div>
                  <div>
                    <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-1.5">Fair market value (FMV)</p>
                    <p className="text-[15px] font-medium text-black">
                      {formData.fmvType === 'Pay range' 
                        ? `$${formData.minFmv || '30'} - $${formData.maxFmv || '50'} ${formData.fmvFrequency || 'per hour'}`
                        : `$${formData.exactFmv || '80,000'} ${formData.fmvFrequency || 'per year'}`
                      }
                    </p>
                  </div>
                </div>
              </div>
            </section>

            <section className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm text-black">
              <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                <h2 className="font-bold text-lg text-[#0F172A]">Settings</h2>
                <button onClick={() => setStep(3)} className="text-primary text-sm font-medium flex items-center gap-1 hover:underline">
                  <span className="material-symbols-outlined text-[18px]">edit</span> Edit
                </button>
              </div>
              <div className="p-6 space-y-8">
                <div>
                  <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-1.5">Expiration Date</p>
                  <p className="text-[15px] font-medium text-black">{formData.expirationDate || '03/21/2026'}</p>
                </div>
                <div className="border-t border-gray-100 pt-6">
                  <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-2">Confirmation Email</p>
                  <p className="text-sm text-black leading-relaxed whitespace-pre-wrap">
                    {formData.confirmationEmailPreview || CONFIRMATION_EMAIL_TEMPLATE}
                  </p>
                </div>
              </div>
            </section>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <main className="flex-grow py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="mb-12">
          <h1 className="text-[32px] font-bold mb-3 text-[#0F172A]">Post a Job</h1>
          <p className="text-[17px] text-[#64748B]">
            {step === 1 && "Step 1: Provide basic details about the position"}
            {step === 2 && "Tell us about the compensation offered for this role."}
            {step === 3 && "Save time by automating your communications"}
            {step === 4 && "Let's review the details of your listing."}
          </p>
        </div>

        <StepIndicator currentStep={step} />

        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-8 shadow-sm">
          {renderStep()}
        </div>

        <div className="mt-10 flex items-center justify-between px-2">
          <button 
            onClick={step === 1 ? () => setScreen('jobs') : prevStep}
            className="flex items-center gap-2 px-4 py-2 border border-slate-200 rounded-md text-[13px] font-medium text-[#64748B] hover:bg-slate-50 transition-colors"
          >
            <span className="material-symbols-outlined text-[18px]">arrow_back</span>
            Previous
          </button>
          
          <div className="flex items-center gap-10">
            <button className="text-[15px] font-semibold text-[#2563EB] hover:underline">Save as draft</button>
            <button 
              onClick={step === 4 ? () => setIsPosted(true) : handleNext}
              className="flex items-center gap-2 px-8 py-2.5 bg-[#2563EB] text-white rounded-md text-[15px] font-semibold hover:bg-blue-700 transition-all active:scale-95"
            >
              {step === 4 ? 'Post Job' : 'Next'}
              <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
            </button>
          </div>
        </div>
      </div>
    </main>
  );
};
