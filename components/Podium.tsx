/* eslint-disable @typescript-eslint/no-unused-vars */
import { Trophy, Crown, Coins } from 'lucide-react';
import { User, DisplayMode } from '../types';

interface PodiumProps {
  topThree: User[];
  displayMode: DisplayMode;
  getDisplayValue: (user: User) => number;
  handleUserClick: (user: User) => void;
}

const Podium = ({ topThree, displayMode, getDisplayValue, handleUserClick }: PodiumProps) => {
  if (topThree.length < 3) return null;

  return (
    <div className="flex justify-center items-end space-x-12 mb-10">
      <PodiumPosition
        user={topThree[1]}
        place={2}
        colorScheme="blue"
        getDisplayValue={getDisplayValue}
        onClick={handleUserClick}
      />

      <PodiumPosition
        user={topThree[0]}
        place={1}
        colorScheme="green"
        getDisplayValue={getDisplayValue}
        onClick={handleUserClick}
      />

      <PodiumPosition
        user={topThree[2]}
        place={3}
        colorScheme="orange"
        getDisplayValue={getDisplayValue}
        onClick={handleUserClick}
      />
    </div>
  );
};

interface PodiumPositionProps {
  user: User;
  place: number;
  colorScheme: 'green' | 'blue' | 'orange';
  getDisplayValue: (user: User) => number;
  onClick: (user: User) => void;
}

const PodiumPosition = ({ user, place, colorScheme, getDisplayValue, onClick }: PodiumPositionProps) => {
  const colors = {
    green: {
      bg: 'from-green-600/90 to-green-400/90',
      ring: 'ring-green-400',
      border: 'border-green-400/30',
      shadow: 'shadow-green-500/20',
    },
    blue: {
      bg: 'from-blue-600/90 to-blue-400/90',
      ring: 'ring-blue-400',
      border: 'border-blue-400/30',
      shadow: 'shadow-blue-500/20',
    },
    orange: {
      bg: 'from-orange-600/90 to-orange-400/90',
      ring: 'ring-orange-400',
      border: 'border-orange-400/30',
      shadow: 'shadow-orange-500/20',
    },
  };

  const color = colors[colorScheme];
  const isFirst = place === 1;
  
  return (
    <div className={`relative ${isFirst ? 'w-72 -mt-16 z-10' : 'w-64'} group`} onClick={() => onClick(user)}>
      <div className={`${isFirst ? 'h-96' : 'h-80'} bg-gradient-to-t ${color.bg} rounded-2xl shadow-xl
        ${color.shadow} backdrop-blur-sm transform group-hover:scale-105 transition-all duration-300
        border ${color.border}`}>
        <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 flex flex-col items-center">
          <div className="relative">
            <div className={`${isFirst ? 'h-32 w-32' : 'h-28 w-28'} rounded-2xl bg-slate-800/90 ${color.ring} ring-4 shadow-lg 
              flex items-center justify-center mb-4 overflow-hidden transform group-hover:rotate-6 transition-all duration-300`}>
              <img 
                src={`https://cachet.dunkirk.sh/users/${user.id}/r`}
                alt={`Position ${place}`}
                className="h-full w-full object-cover"
              />
            </div>
            {isFirst ? (
              <div className="absolute -top-6 -right-6">
                <Crown className="h-12 w-12 text-yellow-500" />
              </div>
            ) : (
              <div className="absolute -right-3 -bottom-3">
                <div className={`bg-${colorScheme}-400 rounded-full p-2 shadow-lg`}>
                  <Trophy className="h-5 w-5 text-white" />
                </div>
              </div>
            )}
          </div>
          <span className={`${isFirst ? 'text-3xl' : 'text-2xl'} font-bold text-white mb-2 group-hover:text-${colorScheme}-200 transition-colors`}>
            {user.username}
          </span>
          <div className={`flex items-center space-x-2 bg-${colorScheme}-500/20 rounded-xl px-4 py-2`}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 821 1004" width="24" height="29" fill="none"><path fill="#E5BF36" fillRule="evenodd" d="m292.5 144-129 48-64 151L87 499.5l12.5 155 64 114.5 129 66.5 172.5 36 165-36L765 779l56-124.5V343l-52.5-122.5L630 144l-177-16zm192.621 153.826c24.242 2.537 43.507 21.505 46.421 45.705l4.501 37.374a53 53 0 0 0 35.218 43.725l36.273 12.609c23.247 8.081 37.872 31.101 35.31 55.579l-.626 5.982c-2.413 23.059-19.534 41.873-42.264 46.443l-44.679 8.983a53 53 0 0 0-39.105 33.158l-12.4 32.676c-8.534 22.491-31.145 36.414-55.07 33.909l-6.228-.652c-23.51-2.461-42.548-20.193-46.67-43.469l-7.5-42.349a53 53 0 0 0-33.823-40.474l-33.738-12.463c-22.728-8.395-36.869-31.136-34.347-55.234l.369-3.528c2.574-24.593 21.813-44.138 46.362-47.1l44.176-5.332c21.802-2.631 39.724-18.434 45.061-39.736l6.653-26.552c6.321-25.228 30.239-41.962 56.106-39.254" clipRule="evenodd"/><path fill="#E5BF36" d="M85.503 136.936a16.946 16.946 0 0 0-15.06-14.828c-8.393-.879-16.153 4.551-18.203 12.735l-1.228 4.898a22.76 22.76 0 0 1-19.354 17.068l-9.95 1.201a17.926 17.926 0 0 0-4.064 34.612l5.765 2.13a25.83 25.83 0 0 1 16.486 19.728l1.394 7.87a18.529 18.529 0 0 0 35.569 3.343l1.977-5.212a25.77 25.77 0 0 1 19.013-16.121l8.93-1.796a18.473 18.473 0 0 0 2.424-35.558l-5.829-2.026a25.64 25.64 0 0 1-17.04-21.156zm225.589 746.438a21.926 21.926 0 0 0-19.41-18.63c-10.721-1.122-20.667 5.716-23.458 16.127l-.902 3.365a26 26 0 0 1-22.597 19.147l-16.12 1.569a19.804 19.804 0 0 0-17.777 17.649 19.8 19.8 0 0 0 13.309 20.807l9.298 3.168a32.12 32.12 0 0 1 21.077 23.82l1.246 5.95a24.213 24.213 0 0 0 46.078 4.282l1.628-3.941a29.92 29.92 0 0 1 22.648-18.076l14.151-2.401a20.346 20.346 0 0 0 16.833-17.942 20.346 20.346 0 0 0-14.012-21.49l-10.832-3.481a29.68 29.68 0 0 1-20.287-23.959zM655.503 20.936a16.946 16.946 0 0 0-15.061-14.828c-8.392-.879-16.152 4.55-18.203 12.735l-1.227 4.898a22.76 22.76 0 0 1-19.354 17.068l-9.95 1.2a17.927 17.927 0 0 0-4.064 34.613l5.765 2.13a25.84 25.84 0 0 1 16.486 19.728l1.394 7.87a18.53 18.53 0 0 0 16.316 15.197 18.53 18.53 0 0 0 19.252-11.854l1.978-5.212a25.77 25.77 0 0 1 19.012-16.121l8.931-1.796a18.472 18.472 0 0 0 2.424-35.558l-5.829-2.026a25.64 25.64 0 0 1-17.04-21.156z"/><path fill="#725858" d="m585.5 767.5 112-46-112 34.5L462 767.5 313.5 735 213 626.5 196 471l19-122 51-91-70 83.5L165.5 471 177 636l47.5 74.5 77.5 57 171.5 19z"/></svg>
            <span className={`${isFirst ? 'text-2xl' : 'text-xl'} font-mono text-green-400`}>
              {getDisplayValue(user).toLocaleString()}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Podium;  