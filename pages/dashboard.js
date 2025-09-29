/*
 * @author Gaurav Kumar
 */
import React, {useContext, useEffect} from "react";
import {AuthContext} from "../context/auth";
import ParentDashboard from "../components/ParentDashboard";
import StudentDashboard from "../components/StudentDashboard";
import AdminDashboard from "../components/AdminDashboard";
import TeacherDashboard from "../components/TeacherDashboard";
import {useRouter} from "next/router";
import ErrorPage from "../components/ErrorPage";

const Dashboard = () => {
    const {profile, isAuthenticated} = useContext(AuthContext);
    const router = useRouter();
    useEffect(() => {
        // if(isAuthenticated){
        //     router.push("/login");
        // }
    }, [isAuthenticated]);
    return (
        <>
            <DashboardSelector/>
        </>
    )

};

const DashboardSelector = () => {
    const {profile, isAuthenticated} = useContext(AuthContext);
    const router = useRouter();
    if (profile?.role === "parent") {
        return (
            <ParentDashboard/>
        )
    } else if (profile?.role === "kid") {
        return <StudentDashboard/>
    } else if (profile?.role === "super_admin" || profile?.role === "manager") {
        return <AdminDashboard/>
    } else if (profile?.role === "teacher") {
        return <TeacherDashboard/>
    } else {
        return (
            <ErrorPage message={"You are not logged in"}/>
        )
    }
}

export default Dashboard;
