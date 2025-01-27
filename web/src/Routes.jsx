// In this file, all Page components from 'src/pages` are auto-imported. Nested
// directories are supported, and should be uppercase. Each subdirectory will be
// prepended onto the component name.
//
// Examples:
//
// 'src/pages/HomePage/HomePage.js'         -> HomePage
// 'src/pages/Admin/BooksPage/BooksPage.js' -> AdminBooksPage

import { Router, Route, Private, Set } from '@redwoodjs/router'

import BlogLayout from 'src/layouts/BlogLayout'
import ScaffoldLayout from 'src/layouts/ScaffoldLayout'

import { useAuth } from './auth'

const Routes = () => {
  return (
    <Router useAuth={useAuth}>
      {/* <Set wrap={ScaffoldLayout} title="OrderDatas" titleTo="orderDatas" buttonLabel="New OrderData" buttonTo="newOrderData">
        <Route path="/order-datas/new" page={OrderDataNewOrderDataPage} name="newOrderData" />
        <Route path="/order-datas/{id}/edit" page={OrderDataEditOrderDataPage} name="editOrderData" />
        <Route path="/order-datas/{id}" page={OrderDataOrderDataPage} name="orderData" />
        <Route path="/order-datas" page={OrderDataOrderDatasPage} name="orderDatas" />
      </Set> */}
      {/* <Set wrap={ScaffoldLayout} title="WebhookEventLogs" titleTo="webhookEventLogs" buttonLabel="New WebhookEventLog" buttonTo="newWebhookEventLog">
        <Route path="/webhook-event-logs/new" page={WebhookEventLogNewWebhookEventLogPage} name="newWebhookEventLog" />
        <Route path="/webhook-event-logs/{id}/edit" page={WebhookEventLogEditWebhookEventLogPage} name="editWebhookEventLog" />
        <Route path="/webhook-event-logs/{id}" page={WebhookEventLogWebhookEventLogPage} name="webhookEventLog" />
        <Route path="/webhook-event-logs" page={WebhookEventLogWebhookEventLogsPage} name="webhookEventLogs" />
      </Set> */}
      {/* <Set wrap={ScaffoldLayout} title="OrganizationMembers" titleTo="organizationMembers" buttonLabel="New OrganizationMember" buttonTo="newOrganizationMember">
        <Route path="/organization-members/new" page={OrganizationMemberNewOrganizationMemberPage} name="newOrganizationMember" />
        <Route path="/organization-members/{id:Int}/edit" page={OrganizationMemberEditOrganizationMemberPage} name="editOrganizationMember" />
        <Route path="/organization-members/{id:Int}" page={OrganizationMemberOrganizationMemberPage} name="organizationMember" />
        <Route path="/organization-members" page={OrganizationMemberOrganizationMembersPage} name="organizationMembers" />
      </Set> */}
      {/* <Set wrap={ScaffoldLayout} title="Organizations" titleTo="organizations" buttonLabel="New Organization" buttonTo="newOrganization">
        <Route path="/organizations/new" page={OrganizationNewOrganizationPage} name="newOrganization" />
        <Route path="/organizations/{id}/edit" page={OrganizationEditOrganizationPage} name="editOrganization" />
        <Route path="/organizations/{id}" page={OrganizationOrganizationPage} name="organization" />
        <Route path="/organizations" page={OrganizationOrganizationsPage} name="organizations" />
      </Set> */}
      <Private unauthenticated="home">
        <Set wrap={ScaffoldLayout}>
          <Route path="/admin/posts/new" page={PostNewPostPage} name="newPost" />
          <Route path="/admin/posts/{id:Int}/edit" page={PostEditPostPage} name="editPost" />
          <Route path="/admin/posts/{id:Int}" page={PostPostPage} name="post" />
          <Route path="/admin/posts" page={PostPostsPage} name="posts" />
        </Set>
      </Private>

      <Set wrap={BlogLayout}>
        <Route path="/login" page={LoginPage} name="login" />
        <Route path="/signup" page={SignupPage} name="signup" />
        <Route path="/forgot-password" page={ForgotPasswordPage} name="forgotPassword" />
        <Route path="/reset-password" page={ResetPasswordPage} name="resetPassword" />
        <Route path="/contact" page={ContactPage} name="contact" />
        <Route path="/article/{id:Int}" page={ArticlePage} name="article" />
        <Route path="/about" page={AboutPage} name="about" />
        <Route path="/a/{appId:String}" page={HomePage} name="home-with-appId" />
        <Route path="/a" page={HomePage} name="home-no-appId" />
        <Route path="/" page={HomePage} name="home" />
      </Set>
      <Route notfound page={NotFoundPage} />
    </Router>
  )
}

export default Routes
