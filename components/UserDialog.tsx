import { LucideLineChart, Trophy} from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { User, GraphPoint } from '../types';
import DoubloonsChart from './DbChart';


interface UserDialogProps {
  user: User | null;
  graphData: GraphPoint[];
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const UserDialog = ({ user, graphData, open, onOpenChange }: UserDialogProps) => {
  if (!user) return null;

  const spentDoubloons = user.total_doubloons - user.current_doubloons;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-black/95 border border-yellow-500/20 backdrop-blur-xl rounded-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-yellow-400">Pirate Profile</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-8">
          <div className="flex items-center space-x-6">
            <div className="h-24 w-24 rounded-2xl bg-gradient-to-br from-yellow-400 to-amber-600 p-1">
              <div className="w-full h-full rounded-xl overflow-hidden">
                <img
                  src={`https://cachet.dunkirk.sh/users/${user.id}/r`}
                  alt={user.username}
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
            <div>
              <h3 className="text-3xl font-bold text-white mb-2">{user.username}</h3>
              <div className="flex items-center space-x-2 bg-yellow-500/10 rounded-lg px-3 py-1 w-fit">
                <Trophy className="h-4 w-4 text-yellow-400" />
                <p className="text-yellow-400">Rank #{user.rank}</p>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-6">
            <StatCard title="Current" value={user.current_doubloons} />
            <StatCard title="Total" value={user.total_doubloons} />
            <StatCard title="Spent" value={spentDoubloons} />
          </div>

          {graphData.length > 0 && (
  <div className="bg-white/5 rounded-xl p-8 border border-yellow-500/20">
    <div className="flex items-center space-x-2 mb-6">
      <LucideLineChart className="h-5 w-5 text-yellow-400" />
      <p className="text-lg font-semibold text-yellow-400">Doubloons History</p>
    </div>
    <div className="h-64">
      <DoubloonsChart data={graphData} />
    </div>
  </div>
)}
        </div>
      </DialogContent>
    </Dialog>
  );
};

interface StatCardProps {
  title: string;
  value: number;
}

const StatCard = ({ title, value }: StatCardProps) => (
  <div className="bg-white/5 rounded-xl p-6 border border-yellow-500/20 hover:bg-white/10 transition-all">
    <p className="text-sm text-yellow-500/70 mb-3">{title}</p>
    <div className="flex items-center space-x-3">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 821 1004" width="24" height="29" fill="none"><path fill="#E5BF36" fillRule="evenodd" d="m292.5 144-129 48-64 151L87 499.5l12.5 155 64 114.5 129 66.5 172.5 36 165-36L765 779l56-124.5V343l-52.5-122.5L630 144l-177-16zm192.621 153.826c24.242 2.537 43.507 21.505 46.421 45.705l4.501 37.374a53 53 0 0 0 35.218 43.725l36.273 12.609c23.247 8.081 37.872 31.101 35.31 55.579l-.626 5.982c-2.413 23.059-19.534 41.873-42.264 46.443l-44.679 8.983a53 53 0 0 0-39.105 33.158l-12.4 32.676c-8.534 22.491-31.145 36.414-55.07 33.909l-6.228-.652c-23.51-2.461-42.548-20.193-46.67-43.469l-7.5-42.349a53 53 0 0 0-33.823-40.474l-33.738-12.463c-22.728-8.395-36.869-31.136-34.347-55.234l.369-3.528c2.574-24.593 21.813-44.138 46.362-47.1l44.176-5.332c21.802-2.631 39.724-18.434 45.061-39.736l6.653-26.552c6.321-25.228 30.239-41.962 56.106-39.254" clipRule="evenodd"/><path fill="#E5BF36" d="M85.503 136.936a16.946 16.946 0 0 0-15.06-14.828c-8.393-.879-16.153 4.551-18.203 12.735l-1.228 4.898a22.76 22.76 0 0 1-19.354 17.068l-9.95 1.201a17.926 17.926 0 0 0-4.064 34.612l5.765 2.13a25.83 25.83 0 0 1 16.486 19.728l1.394 7.87a18.529 18.529 0 0 0 35.569 3.343l1.977-5.212a25.77 25.77 0 0 1 19.013-16.121l8.93-1.796a18.473 18.473 0 0 0 2.424-35.558l-5.829-2.026a25.64 25.64 0 0 1-17.04-21.156zm225.589 746.438a21.926 21.926 0 0 0-19.41-18.63c-10.721-1.122-20.667 5.716-23.458 16.127l-.902 3.365a26 26 0 0 1-22.597 19.147l-16.12 1.569a19.804 19.804 0 0 0-17.777 17.649 19.8 19.8 0 0 0 13.309 20.807l9.298 3.168a32.12 32.12 0 0 1 21.077 23.82l1.246 5.95a24.213 24.213 0 0 0 46.078 4.282l1.628-3.941a29.92 29.92 0 0 1 22.648-18.076l14.151-2.401a20.346 20.346 0 0 0 16.833-17.942 20.346 20.346 0 0 0-14.012-21.49l-10.832-3.481a29.68 29.68 0 0 1-20.287-23.959zM655.503 20.936a16.946 16.946 0 0 0-15.061-14.828c-8.392-.879-16.152 4.55-18.203 12.735l-1.227 4.898a22.76 22.76 0 0 1-19.354 17.068l-9.95 1.2a17.927 17.927 0 0 0-4.064 34.613l5.765 2.13a25.84 25.84 0 0 1 16.486 19.728l1.394 7.87a18.53 18.53 0 0 0 16.316 15.197 18.53 18.53 0 0 0 19.252-11.854l1.978-5.212a25.77 25.77 0 0 1 19.012-16.121l8.931-1.796a18.472 18.472 0 0 0 2.424-35.558l-5.829-2.026a25.64 25.64 0 0 1-17.04-21.156z"/><path fill="#725858" d="m585.5 767.5 112-46-112 34.5L462 767.5 313.5 735 213 626.5 196 471l19-122 51-91-70 83.5L165.5 471 177 636l47.5 74.5 77.5 57 171.5 19z"/></svg>
      <span className="text-2xl font-bold text-yellow-400">
        {value.toLocaleString()}
      </span>
    </div>
  </div>
);

export default UserDialog;