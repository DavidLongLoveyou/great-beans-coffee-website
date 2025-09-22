import { redirect } from 'next/navigation';

export default function RootPage() {
  // 302 redirect to default locale
  redirect('/en');
}