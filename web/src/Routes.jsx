// In this file, all Page components from 'src/pages` are auto-imported. Nested
// directories are supported, and should be uppercase. Each subdirectory will be
// prepended onto the component name.
//
// Examples:
//
// 'src/pages/HomePage/HomePage.js'         -> HomePage
// 'src/pages/Admin/BooksPage/BooksPage.js' -> AdminBooksPage

import { Router, Route, Private, Set } from '@redwoodjs/router'

import { useAuth } from 'src/auth'
import BlogLayout from 'src/layouts/BlogLayout'
import ScaffoldLayout from 'src/layouts/ScaffoldLayout'

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
        <Set wrap={ScaffoldLayout} title="Endpoints" titleTo="endpoints" buttonLabel="New Endpoint" buttonTo="newEndpoint">
          <Route path="/endpoints/new/{userId:String,organizationId:String}" page={EndpointNewEndpointPage} name="newEndpointUserOrg" />
          <Route path="/endpoints/new" page={EndpointNewEndpointPage} name="newEndpoint" />
          <Route path="/endpoints/{id}/edit" page={EndpointEditEndpointPage} name="editEndpoint" />
          <Route path="/endpoints/{id}" page={EndpointEndpointPage} name="endpoint" />
          <Route path="/endpoints" page={EndpointEndpointsPage} name="endpoints" />
        </Set>

        <Route path="/blog" page={BlogPage} name="blog" />
        <Route path="/docs" page={DocsPage} name="docs" />
        <Route path="/organization-members" page={OrganizationMembersPage} name="organizationMembers" />
        <Route path="/settings/{appId:String,userId:String}" page={SettingsPage} name="settingsOfAnOrg" />

        <Route path="/orders/{appId:String,userId:String}" page={OrdersPage} name="ordersOfAnOrg" />
        <Route path="/events/{appId:String,userId:String}" page={EventsPage} name="eventsOfAnOrg" />
        <Route path="/a/{appId:String}" page={HomePage} name="homeWithAppId" />

        <Route path="/login" page={LoginPage} name="login" />
        <Route path="/signup" page={SignupPage} name="signup" />
        <Route path="/forgot-password" page={ForgotPasswordPage} name="forgotPassword" />
        <Route path="/reset-password" page={ResetPasswordPage} name="resetPassword" />
        <Route path="/contact" page={ContactPage} name="contact" />
        <Route path="/article/{id:Int}" page={ArticlePage} name="article" />
        <Route path="/about" page={AboutPage} name="about" />

        <Route path="/a" page={HomePage} name="home-no-appId" />
        <Route path="/" page={HomePage} name="home" />
      </Set>
      <Route notfound page={NotFoundPage} />
    </Router>
  )
}

export default Routes
