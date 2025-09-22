import { Metadata } from 'next';
import { getCurrentLocale, t } from '@/lib/i18n';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MapPin, Clock, Users, Coffee } from 'lucide-react';



export async function generateMetadata(): Promise<Metadata> {
  const locale = await getCurrentLocale();

  return {
    title: await t('meta.title', locale),
    description: await t('meta.description', locale),
    openGraph: {
      title: await t('meta.title', locale),
      description: await t('meta.description', locale),
      type: 'website',
    },
  };
}

const jobOpenings = [
  {
    id: 1,
    title: 'Coffee Quality Specialist',
    department: 'Quality Assurance',
    location: 'Ho Chi Minh City, Vietnam',
    type: 'Full-time',
    description: 'Join our quality team to ensure the highest standards of coffee beans for our international clients.',
    requirements: ['3+ years experience in coffee quality assessment', 'Knowledge of coffee grading standards', 'Fluent in English and Vietnamese'],
  },
  {
    id: 2,
    title: 'Export Sales Manager',
    department: 'Sales',
    location: 'Ho Chi Minh City, Vietnam',
    type: 'Full-time',
    description: 'Lead our international sales efforts and build relationships with global coffee buyers.',
    requirements: ['5+ years experience in export sales', 'Strong network in coffee industry', 'Excellent communication skills'],
  },
  {
    id: 3,
    title: 'Sustainability Coordinator',
    department: 'Operations',
    location: 'Dak Lak Province, Vietnam',
    type: 'Full-time',
    description: 'Work with local farmers to implement sustainable farming practices and certification programs.',
    requirements: ['Background in agriculture or sustainability', 'Experience working with farming communities', 'Passion for environmental conservation'],
  },
];

export default async function CareersPage() {

  return (
    <div className="min-h-screen bg-gradient-to-b from-coffee-50 to-white">
      {/* Hero Section */}
      <section className="relative py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-coffee-900 mb-6">
            Join Our Team
          </h1>
          <p className="text-xl text-coffee-700 max-w-3xl mx-auto mb-8">
            Be part of our mission to connect Vietnamese coffee farmers with the world. 
            We&apos;re looking for passionate individuals who share our commitment to quality and sustainability.
          </p>
        </div>
      </section>

      {/* Why Work With Us */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-coffee-900 text-center mb-12">
            Why Work With The Great Beans?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-coffee-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Coffee className="w-8 h-8 text-coffee-600" />
              </div>
              <h3 className="text-xl font-semibold text-coffee-900 mb-2">Coffee Passion</h3>
              <p className="text-coffee-700">Work with premium coffee and learn from industry experts</p>
            </div>
            <div className="text-center">
              <div className="bg-coffee-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-coffee-600" />
              </div>
              <h3 className="text-xl font-semibold text-coffee-900 mb-2">Great Team</h3>
              <p className="text-coffee-700">Join a diverse, collaborative team of coffee enthusiasts</p>
            </div>
            <div className="text-center">
              <div className="bg-coffee-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <MapPin className="w-8 h-8 text-coffee-600" />
              </div>
              <h3 className="text-xl font-semibold text-coffee-900 mb-2">Global Impact</h3>
              <p className="text-coffee-700">Make a difference in farmers&apos; lives and global coffee trade</p>
            </div>
            <div className="text-center">
              <div className="bg-coffee-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Clock className="w-8 h-8 text-coffee-600" />
              </div>
              <h3 className="text-xl font-semibold text-coffee-900 mb-2">Work-Life Balance</h3>
              <p className="text-coffee-700">Flexible working arrangements and competitive benefits</p>
            </div>
          </div>
        </div>
      </section>

      {/* Job Openings */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-coffee-900 text-center mb-12">
            Current Openings
          </h2>
          <div className="space-y-6">
            {jobOpenings.map((job) => (
              <Card key={job.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                      <CardTitle className="text-xl text-coffee-900">{job.title}</CardTitle>
                      <CardDescription className="text-coffee-600">{job.department}</CardDescription>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="secondary">
                        <MapPin className="w-3 h-3 mr-1" />
                        {job.location}
                      </Badge>
                      <Badge variant="outline">
                        <Clock className="w-3 h-3 mr-1" />
                        {job.type}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-coffee-700 mb-4">{job.description}</p>
                  <div className="mb-4">
                    <h4 className="font-semibold text-coffee-900 mb-2">Requirements:</h4>
                    <ul className="list-disc list-inside text-coffee-700 space-y-1">
                      {job.requirements.map((req, index) => (
                        <li key={index}>{req}</li>
                      ))}
                    </ul>
                  </div>
                  <Button className="bg-coffee-600 hover:bg-coffee-700">
                    Apply Now
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-coffee-900 mb-6">
            Don&apos;t See a Perfect Match?
          </h2>
          <p className="text-xl text-coffee-700 mb-8">
            We&apos;re always looking for talented individuals to join our team. 
            Send us your resume and tell us how you&apos;d like to contribute to our mission.
          </p>
          <Button size="lg" className="bg-coffee-600 hover:bg-coffee-700">
            Send Your Resume
          </Button>
        </div>
      </section>
    </div>
  );
}