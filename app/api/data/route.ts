import { NextResponse } from 'next/server'
import {
  HeaderData,
  CourseData,
  HourData,
  Companiesdata,
  CourseDetailData,
  MentorData,
  TestimonialData,
  FooterLinkData,
} from './constants'

export const GET = () => {
  return NextResponse.json({
    HeaderData,
    CourseData,
    HourData,
    Companiesdata,
    CourseDetailData,
    MentorData,
    TestimonialData,
    FooterLinkData,
  })
}
