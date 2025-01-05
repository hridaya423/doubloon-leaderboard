'use client';

import React, { useState, useEffect } from 'react';
import { Loader2 } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { User, ApiResponse, GraphPoint, DisplayMode, StatsData } from '../types';
import StatsHero from './StatsHero';
import Podium from './Podium';
import SearchFilters from './SearchFilters';
import LeaderboardList from './LbList';
import UserDialog from './UserDialog';

const DoubloonsLeaderboard = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [topThree, setTopThree] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [displayMode, setDisplayMode] = useState<DisplayMode>('current');
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [graphData, setGraphData] = useState<GraphPoint[]>([]);
  const [showUserDialog, setShowUserDialog] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [allUsersStats, setAllUsersStats] = useState<StatsData>({
    totalDoubloons: 0,
    totalUsers: 0,
    isLoading: true
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted) {
      setCurrentPage(1);
      fetchUsers();
    }
  }, [displayMode, mounted]);

  useEffect(() => {
    fetchAllUsersStats();
  }, []);

  useEffect(() => {
    if (users.length > 0) {
      const sortedUsers = sortAndRankUsers([...users]);
      setUsers(sortedUsers);
      if (currentPage === 1) {
        setTopThree(sortedUsers.slice(0, 3));
      }
    }
  }, [displayMode]);

  useEffect(() => {
    if (mounted && !isSearching) {
      fetchUsers();
    }
  }, [currentPage, mounted, isSearching]);

  const fetchAllUsersStats = async () => {
    try {
      let allDoubloons = 0;
      let userCount = 0;
      
      for (let page = 1; page <= 21; page++) {
        const res = await fetch('/api/data', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ page, sortBy: 'total' })
        });
        
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        
        const data: ApiResponse = await res.json();
        data.users.forEach(user => {
          allDoubloons += user.total_doubloons;
          userCount++;
        });
      }
      
      setAllUsersStats({
        totalDoubloons: allDoubloons,
        totalUsers: userCount,
        isLoading: false
      });
    } catch (err) {
      console.error('Error fetching all users:', err);
      setAllUsersStats(prev => ({ ...prev, isLoading: false }));
    }
  };

  const sortAndRankUsers = (userList: User[]) => {
    return userList
      .sort((a, b) => getDisplayValue(b) - getDisplayValue(a))
      .map((user, index) => ({ ...user, rank: index + 1 }));
  };

  const fetchUsers = async () => {
    if (isSearching) return;

    try {
      setLoading(true);
      setError(null);
      
      const res = await fetch('/api/data', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ page: currentPage, sortBy: displayMode })
      });
      
      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
      
      const data: ApiResponse = await res.json();
      const usersWithRank = data.users.map((user, index) => ({
        ...user,
        rank: ((currentPage - 1) * 10) + index + 1
      }));
      
      setUsers(usersWithRank);
      if (currentPage === 1) {
        setTopThree(usersWithRank.slice(0, 3));
      }
      setTotalPages(data.pages);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch users');
      console.error('Error fetching users:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async () => {
    if (!searchTerm.trim()) {
      handleClearSearch();
      return;
    }

    try {
      setLoading(true);
      setError(null);
      setIsSearching(true);

      const res = await fetch('/api/search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: searchTerm, sortBy: displayMode })
      });
      
      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
      
      const data: ApiResponse = await res.json();
      const rankedResults = data.users.map((user, index) => ({
        ...user,
        rank: index + 1
      }));
      setSearchResults(rankedResults);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to search users');
      console.error('Error searching users:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleClearSearch = () => {
    setSearchTerm('');
    setSearchResults([]);
    setIsSearching(false);
    fetchUsers();
  };

  const fetchUserGraph = async (userId: string) => {
    try {
      setError(null);

      const res = await fetch('/api/graph', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: userId })
      });
      
      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
      
      const data: GraphPoint[] = await res.json();
      setGraphData(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch graph data');
      console.error('Error fetching user graph:', err);
    }
  };

  const handleUserClick = async (user: User) => {
    setSelectedUser(user);
    await fetchUserGraph(user.id);
    setShowUserDialog(true);
  };

  const getDisplayValue = (user: User) => {
    switch (displayMode) {
      case 'current':
        return user.current_doubloons;
      case 'total':
        return user.total_doubloons;
      case 'spent':
        return user.total_doubloons - user.current_doubloons;
    }
  };

  const getDisplayedUsers = () => {
    const displayedUsers = searchTerm ? searchResults : users;
    if (currentPage === 1 && !searchTerm) {
      return displayedUsers.slice(3);
    }
    return displayedUsers;
  };

  if (!mounted) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-900">
        <Loader2 className="h-8 w-8 animate-spin text-purple-400" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-slate-900 to-black text-gray-200">
      <div className="fixed inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_10%_20%,rgba(255,215,0,0.07),transparent_40%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_90%_80%,rgba(255,215,0,0.07),transparent_40%)]" />
        <div className="absolute inset-0 bg-[url('/noise.jpg')] opacity-5 mix-blend-overlay" />
      </div>

      <div className="relative">
        <StatsHero stats={allUsersStats} />
        
        {topThree.length > 0 && (
          <Podium
            topThree={topThree}
            displayMode={displayMode}
            getDisplayValue={getDisplayValue}
            handleUserClick={handleUserClick}
          />
        )}

        <div className="relative max-w-7xl mx-auto px-4 pb-16">
          <SearchFilters
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            handleSearch={handleSearch}
            handleClearSearch={handleClearSearch}
            displayMode={displayMode}
            setDisplayMode={setDisplayMode}
          />

          {error && (
            <Alert className="mb-6 bg-red-500/10 border-red-500/20 text-red-400">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <LeaderboardList
            users={getDisplayedUsers()}
            loading={loading}
            currentPage={currentPage}
            totalPages={totalPages}
            isSearching={isSearching}
            getDisplayValue={getDisplayValue}
            handleUserClick={handleUserClick}
            setCurrentPage={setCurrentPage}
          />

          <UserDialog
            user={selectedUser}
            graphData={graphData}
            open={showUserDialog}
            onOpenChange={setShowUserDialog}
          />
        </div>
      </div>
    </div>
  );
};

export default DoubloonsLeaderboard;