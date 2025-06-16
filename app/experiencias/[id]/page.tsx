// pages/servicios/[id].tsx o app/servicios/[id]/page.tsx
import { useRouter } from 'next/router';
import ServiceDetail from '../../components/serviceDetail/serviceDetail';


export default function ServiceDetailPage({ 
  params 
}: { 
  params: { id: string } 
}) {
  const serviceId = parseInt(params.id, 10);
  return <ServiceDetail serviceId={serviceId} />;
}