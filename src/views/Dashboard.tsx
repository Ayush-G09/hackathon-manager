import IntroSection from "../components/Dashboard/IntroSection";
import StatsSection from "../components/Dashboard/StatsSection";
import InfoSection from "../components/Dashboard/InfoSection";
import SearchSection from "../components/Dashboard/SearchSection";
import Challanges from "../components/Dashboard/Challanges";
import { useSelector } from "react-redux";
import { Challange, ChallangeStatus, filter } from "../types";
import { useEffect, useState } from "react";
import { getStatus } from "../utils";

type State = {
  challanges: Challange[];
  searchQuery: string;
  filter: filter;
};

function Dashboard() {

  const [state, setState] = useState<State>({
    challanges: [],
    searchQuery: '',
    filter: {
      active: false,
      upcoming: false,
      past: false,
      easy: false,
      medium: false,
      hard: false,
    }
  });

  const challenges = useSelector(
    (state: any) => state.challenges
  ) as Challange[];

  console.log({challenges})

  useEffect(() => {
    setState((prev) => ({...prev, challanges: challenges}));
  }, [challenges]);

  useEffect(() => {
    const filteredChallenges = challenges.filter(cha => cha.name.toLowerCase().includes(state.searchQuery.trim().toLowerCase()));
    setState((prev) => ({...prev, challanges: filteredChallenges}));
  }, [state.searchQuery]);

  useEffect(() => {
    let filteredChallenges: Challange[] = [];
  
    if (state.filter.active) {
      const activeChallenges = challenges.filter(cha =>
        getStatus(cha.startDate, cha.endDate) as ChallangeStatus === 'Active'
      );
      filteredChallenges = activeChallenges;
    }else{
      filteredChallenges.filter(cha => getStatus(cha.startDate, cha.endDate) as ChallangeStatus === 'Active');
    }
  
    if (state.filter.upcoming) {
      const upcomingChallenges = challenges.filter(cha =>
        getStatus(cha.startDate, cha.endDate) as ChallangeStatus === 'Upcoming'
      );
      filteredChallenges = [...filteredChallenges, ...upcomingChallenges];
    }else{
      filteredChallenges.filter(cha => getStatus(cha.startDate, cha.endDate) as ChallangeStatus === 'Upcoming');
    }

    if (state.filter.past) {
      const pastChallenges = challenges.filter(cha =>
        getStatus(cha.startDate, cha.endDate) as ChallangeStatus === 'Past'
      );
      filteredChallenges = [...filteredChallenges, ...pastChallenges];
    }else{
      filteredChallenges.filter(cha => getStatus(cha.startDate, cha.endDate) as ChallangeStatus === 'Past');
    }

    if (state.filter.easy) {
      const easyChallenges = challenges.filter(cha => cha.level === 'Easy');
      filteredChallenges = [...filteredChallenges, ...easyChallenges];
    }else{
      filteredChallenges.filter(cha => cha.level === 'Easy');
    }

    if (state.filter.medium) {
      const mediumChallenges = challenges.filter(cha => cha.level === 'Medium');
      filteredChallenges = [...filteredChallenges, ...mediumChallenges];
    }else{
      filteredChallenges.filter(cha => cha.level === 'Medium');
    }

    if (state.filter.hard) {
      const hardChallenges = challenges.filter(cha => cha.level === 'Hard');
      filteredChallenges = [...filteredChallenges, ...hardChallenges];
    }else{
      filteredChallenges.filter(cha => cha.level === 'Hard');
    }
  
    if (!state.filter.active && !state.filter.upcoming && !state.filter.past && !state.filter.easy && !state.filter.medium && !state.filter.hard) {
      filteredChallenges = challenges;
    }

    const uniqueById = (filteredChallenges: Challange[]): Challange[] => {
      return filteredChallenges.reduce<Challange[]>((acc, current) => {
        const exists = acc.find(item => item.id === current.id);
        if (!exists) {
          return [...acc, current];
        }
        return acc;
      }, []);
    };

    filteredChallenges = uniqueById(filteredChallenges);
  
    setState(prev => ({ ...prev, challanges: filteredChallenges }));
  }, [state.filter]);
  

  return (
    <div style={{ width: "100%", height: "100%" }}>
      <IntroSection />
      <StatsSection />
      <InfoSection />
      <SearchSection onFilterChange={(filter: filter) => setState((prev) => ({...prev, filter: filter}))} filter={state.filter} value={state.searchQuery} onChange={(e) => setState((prev) => ({...prev, searchQuery: e}))} />
      <Challanges challenges={state.challanges} />
    </div>
  );
}

export default Dashboard;
