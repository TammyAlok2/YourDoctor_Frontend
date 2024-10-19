import Image from 'next/image'
import React from 'react'

const ServicesSection = () => {
	return (
		<div>
			<section className="why-choose section mb-[8rem]" >
				<div className="mx-auto py-[2rem]">
					<div className="row">
						<div className="col-lg-12">
							<div className="flex flex-col items-center justify-center gap-5">
								<h2 className='text-[2.2rem] text-center'>We have Multiple Specialist To<br /> Improve Your Health</h2>
								<Image width={80} height={80} src="/section-img.png" alt="#" />
								<p className='font-medium text-[1.2rem] text-gray-600'>At YourLab, our mission is to prioritize your well-being by offering a wide range of services tailored to meet your unique health needs.</p>
							</div>
						</div>
					</div>
					<div className="row mt-10">
						<div className="col-lg-6 col-12 w-[70%] mx-auto">
							<div className="choose-left">
								<div className="flex flex-col items-center justify-center gap-10">
									<div className="col-lg-6">
										<div className="list flex flex-col gap-10">
											<div className='flex gap-3 flex-col font-normal text-gray-800 text-[1.5rem] shadow-lg p-[0.3rem] relative group'>
												<div className='flex gap-3 items-center'>
												<Image width={50} height={50} className='w-[2.5rem]' quality={100} objectFit='cover' priority={true} src="https://img.icons8.com/external-outline-berkahicon/50/external-avatar-medical-worker-avatar-outline-berkahicon-32.png" alt="treatment-plan" />
												<h1>Neurologist</h1>
												</div>
												<span className="absolute -bottom-1 right-0 w-0 h-1 bg-black group-hover:w-full group-hover:transition-all duration-1000"></span>
											</div>
											<div className='flex gap-3 flex-col font-normal text-gray-800 text-[1.5rem] ml-[10rem] p-[0.3rem] shadow-lg relative group'>
												<div className='flex gap-3 items-center'>
												<Image width={50} height={50} className='w-[2.5rem]' quality={100} objectFit='cover' priority={true} src="https://img.icons8.com/external-ddara-lineal-ddara/64/external-cardiologist-ar-and-vr-technology-ddara-lineal-ddara.png" alt="external-Heart-Surgery-surgery-others-pike-picture-3" />
												<h1>Cardiologist</h1>
												</div>
												<span className="absolute -bottom-1 right-0 w-0 h-1 bg-black group-hover:w-full group-hover:transition-all duration-1000"></span>
											</div>
											<div className='flex gap-3 flex-col font-normal text-gray-800 text-[1.5rem] ml-[15rem] p-[0.3rem] shadow-lg relative group'>
												<div className='flex gap-3 items-center'>
												<Image width={50} height={50} className='w-[3rem]' quality={100} objectFit='cover' priority={true} src="https://img.icons8.com/external-others-pike-picture/50/external-Endocrinologist-doctor-others-pike-picture-2.png" alt="vision" />
												<h1>Endocrinologist</h1>
												</div>
												<span className="absolute -bottom-1 right-0 w-0 h-1 bg-black group-hover:w-full group-hover:transition-all duration-1000"></span>
											</div>
										</div>
									</div>
									<div className="col-lg-6">
										<div className="list flex flex-col gap-10">
											<div className='flex gap-3 flex-col font-normal text-gray-800 text-[1.5rem] ml-[1rem] p-[0.3rem] shadow-lg relative group'>
												<div className='flex gap-3 items-center'>
												<Image width={50} height={50} className='w-[3rem]' quality={100} objectFit='cover' priority={true} src="https://cdn.iconscout.com/icon/premium/png-256-thumb/male-nephrologist-4719069-3936146.png" alt="external-blood-transfusion-hospital-justicon-lineal-justicon" />
												<h1>Nephrologist</h1>
												</div>
												<span className="absolute -bottom-1 right-0 w-0 h-1 bg-black group-hover:w-full group-hover:transition-all duration-1000"></span>
											</div>
											<div className='flex gap-3 flex-col font-normal text-gray-800 text-[1.5rem] ml-[-3rem] p-[0.3rem] shadow-lg relative group'>
												<div className='flex gap-3 items-center'>
												<Image width={50} height={50} className='w-[2.5rem]' quality={100} objectFit='cover' priority={true} src="https://img.icons8.com/external-wanicon-lineal-wanicon/50/external-oncologist-health-professionals-avatars-wanicon-lineal-wanicon.png" alt="external-blood-transfusion-hospital-justicon-lineal-justicon" />
												<h1>Oncologist</h1>
												</div>
												<span className="absolute -bottom-1 right-0 w-0 h-1 bg-black group-hover:w-full group-hover:transition-all duration-1000"></span>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
						
					</div>
				</div>
			</section>
		</div>
	)
}

export default ServicesSection
