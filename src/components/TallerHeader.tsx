
import { Wrench } from 'lucide-react';

interface TallerHeaderProps {
  titulo: string;
  descripcion?: string;
}

const TallerHeader = ({ titulo, descripcion }: TallerHeaderProps) => {
  return (
    <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white py-6 px-6 rounded-lg shadow-lg mb-6">
      <div className="flex items-center gap-3">
        <div className="bg-white/20 p-3 rounded-full">
          <Wrench className="h-6 w-6" />
        </div>
        <div>
          <h1 className="text-2xl font-bold">{titulo}</h1>
          {descripcion && (
            <p className="text-blue-100 mt-1">{descripcion}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default TallerHeader;
