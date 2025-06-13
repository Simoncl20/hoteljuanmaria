import RoomDetail from '../../components/roomDetail/roomDetail';

export default function RoomPage({ params }: { params: { id: string } }) {
  return <RoomDetail roomId={parseInt(params.id)} />;
} 