import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Admin from "../admin/Admin";
import AdminLogin from "../admin/AdminLogin";
import AdminHeader from "../admin/AdminHeader";
import AdminSetting from "../admin/AdminSetting";
import RechargeRequest from "../admin/RechargeRequest";
import WithdrawRequest from "../admin/WithdrawRequest";
import AdminUserList from "../admin/AdminUserList";
import ApproveRecharges from "../admin/ApproveRecharges";
import ApprovedWithdraws from "../admin/ApprovedWithdraws";

const AdminLayout = () => {



  return (
    <div className="">
      {/* You can add an AdminNavbar here */}
      <AdminHeader />
      <Routes>
        <Route path="/login" element={<AdminLogin />} />
        <Route path="/" element={ <Admin /> } />
        <Route path="/admin-setting" element={ <AdminSetting /> } />
        <Route path="/recharge-request" element={ <RechargeRequest /> } />
        <Route path="/withdraw-request" element={ <WithdrawRequest /> } />
        <Route path="/users" element={ <AdminUserList /> } />
        <Route path="/approved-recharges" element={ <ApproveRecharges /> } />
        <Route path="/approved-withdraws" element={ <ApprovedWithdraws /> } />


        






        {/* <Route path="users" element={<AdminUsers />} /> */}
        {/* Add more admin routes */}
      </Routes>
    </div>
  );
};

export default AdminLayout;
