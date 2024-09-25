import Header from "../components/Header";
import { Outlet } from "react-router-dom";
import Notifications from "../components/Notification/Notification";
import { NotificationCard } from "../types";
import { useDispatch, useSelector } from "react-redux";
import { removeNotification } from "../store/action";
import styled from "styled-components";

function Layout() {
  const notifications = useSelector(
    (state: any) => state.notifications as NotificationCard[]
  );
  const dispatch = useDispatch();

  return (
    <>
      <StyledLayout>
        <Header />
        <div style={{ width: "100%", height: "93vh" }}>
          <Outlet />
        </div>
      </StyledLayout>
      <Notifications
        cards={notifications}
        removeCard={(id: string) => dispatch(removeNotification(id))}
      />
    </>
  );
}

const StyledLayout = styled.div`
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  overflow-y: scroll;

  &::-webkit-scrollbar {
    display: none;
  }

  scrollbar-width: none;
`;

export default Layout;
