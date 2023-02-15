import React from 'react';

import {
  Home as HomeView,
  Customers as CustomersView,
  HireUs as HireUsView,
  Faq as FaqView,
  Agency as AgencyView,
  CareerListing as CareerListingView,
  CareerListingMinimal as CareerListingMinimalView,
  CareerOpening as CareerOpeningView,
  ContactPage as ContactPageView,
  Cart as CartPageView,
  Checkout as CheckOutPage,
  SubscCriptionCheckout as SubscCriptionCheckoutView,
  Coworking as CoworkingView,
  Categories as CategoriesView,
  Elearning as ElearningView,
  Enterprise as EnterpriseView,
  Service as ServiceView,
  WebBasic as WebBasicView,
  DesktopApp as DesktopAppView,
  Expo as ExpoView,
  Startup as StartupView,
  DesignCompany as DesignCompanyView,
  MobileApp as MobileAppView,
  JobListing as JobListingView,
  Rental as RentalView,
  CloudHosting as CloudHostingView,
  Logistics as LogisticsView,
  Ecommerce as EcommerceView,
  ProductOverview,
  SingleSubscriptionProduct as SingleSubscriptionProductView,
  Listing as ListingView,
  AllProductView,
  About as AboutView,
  HelpCenter as HelpCenterView,
  HelpCenterArticle as HelpCenterArticleView,
  PortfolioPage as PortfolioPageView,
  PortfolioMasonry as PortfolioMasonryView,
  PortfolioGrid as PortfolioGridView,
  CompanyTerms as CompanyTermsView,
  ContactPageSidebarMap as ContactPageSidebarMapView,
  ContactPageCover as ContactPageCoverView,
  AboutSideCover as AboutSideCoverView,
  BlogSearch as BlogSearchView,
  BlogNewsroom as BlogNewsroomView,
  BlogArticle as BlogArticleView,
  StoryArticle as StoryArticleView,
  BlogReachView as BlogReachViewView,
  PasswordResetCover as PasswordResetCoverView,
  PasswordResetSimple as PasswordResetSimpleView,
  SigninSimple as SigninSimpleView,
  SigninCover as SigninCoverView,
  SignupSimple as SignupSimpleView,
  OrderComplete as OrderCompleteView,
  SignupCover as SignupCoverView,
  AccountBilling as AccountBillingView,
  MyOrders as MyOrdersView,
  AccountGeneral as AccountGeneralView,
  AccountNotifications as AccountNotificationsView,
  AccountSecurity as AccountSecurityView,
  NotFound as NotFoundView,
  NotFoundCover as NotFoundCoverView,
} from 'views';
import PrivateRoute from './PrivateRoute/PrivateRoute';

const routes = [
  {
    path: '/home',
    renderer: (params = {}): JSX.Element => <HomeView {...params} />,
  },
  {
    path: '/customers',
    renderer: (params = {}): JSX.Element => <CustomersView {...params} />,
  },
  {
    path: '/hire-us',
    renderer: (params = {}): JSX.Element => <HireUsView {...params} />,
  },
  {
    path: '/faq',
    renderer: (params = {}): JSX.Element => <FaqView {...params} />,
  },
  {
    path: '/career-listing',
    renderer: (params = {}): JSX.Element => <CareerListingView {...params} />,
  },
  {
    path: '/career-listing-minimal',
    renderer: (params = {}): JSX.Element => (
      <CareerListingMinimalView {...params} />
    ),
  },
  {
    path: '/career-opening/:slug',
    renderer: (params = {}): JSX.Element => <CareerOpeningView {...params} />,
  },
  {
    path: '/contact-page',
    renderer: (params = {}): JSX.Element => <ContactPageView {...params} />,
  },
  {
    path: '/cart-page',
    renderer: (params = {}): JSX.Element => (
      <PrivateRoute>
        <CartPageView {...params} />
      </PrivateRoute>
    ),
  },
  {
    path: '/my-orders',
    renderer: (params = {}): JSX.Element => (
      <PrivateRoute>
        <MyOrdersView {...params} />
      </PrivateRoute>
    ),
  },
  {
    path: '/check-out-page',
    renderer: (params = {}): JSX.Element => <CheckOutPage {...params} />,
  },
  {
    path: '/subcription-check-out',
    renderer: (params = {}): JSX.Element => (
      <SubscCriptionCheckoutView {...params} />
    ),
  },
  {
    path: '/categorie',
    renderer: (params = {}): JSX.Element => <CategoriesView {...params} />,
  },
  {
    path: '/category/:slug',
    renderer: (params = {}): JSX.Element => <ListingView {...params} />,
  },
  {
    path: '/product/:slug',
    renderer: (params = {}): JSX.Element => <AllProductView {...params} />,
  },
  {
    path: '/order-complete',
    renderer: (params = {}): JSX.Element => <OrderCompleteView {...params} />,
  },
  {
    path: '/coworking',
    renderer: (params = {}): JSX.Element => <CoworkingView {...params} />,
  },
  {
    path: '/e-learning',
    renderer: (params = {}): JSX.Element => <ElearningView {...params} />,
  },
  {
    path: '/enterprise',
    renderer: (params = {}): JSX.Element => <EnterpriseView {...params} />,
  },
  {
    path: '/service',
    renderer: (params = {}): JSX.Element => <ServiceView {...params} />,
  },
  {
    path: '/web-basic',
    renderer: (params = {}): JSX.Element => <WebBasicView {...params} />,
  },
  {
    path: '/',
    renderer: (params = {}): JSX.Element => <DesktopAppView {...params} />,
  },
  {
    path: '/expo',
    renderer: (params = {}): JSX.Element => <ExpoView {...params} />,
  },
  {
    path: '/agency',
    renderer: (params = {}): JSX.Element => <AgencyView {...params} />,
  },
  {
    path: '/startup',
    renderer: (params = {}): JSX.Element => <StartupView {...params} />,
  },
  {
    path: '/design-company',
    renderer: (params = {}): JSX.Element => <DesignCompanyView {...params} />,
  },
  {
    path: '/mobile-app',
    renderer: (params = {}): JSX.Element => <MobileAppView {...params} />,
  },
  {
    path: '/job-listing',
    renderer: (params = {}): JSX.Element => <JobListingView {...params} />,
  },
  {
    path: '/rental',
    renderer: (params = {}): JSX.Element => <RentalView {...params} />,
  },
  {
    path: '/cloud-hosting',
    renderer: (params = {}): JSX.Element => <CloudHostingView {...params} />,
  },
  {
    path: '/logistics',
    renderer: (params = {}): JSX.Element => <LogisticsView {...params} />,
  },
  {
    path: '/e-commerce',
    renderer: (params = {}): JSX.Element => <EcommerceView {...params} />,
  },
  {
    path: '/help-center',
    renderer: (params = {}): JSX.Element => <HelpCenterView {...params} />,
  },
  {
    path: '/help-center-article',
    renderer: (params = {}): JSX.Element => (
      <HelpCenterArticleView {...params} />
    ),
  },
  {
    path: '/portfolio-page',
    renderer: (params = {}): JSX.Element => <PortfolioPageView {...params} />,
  },
  {
    path: '/portfolio-masonry',
    renderer: (params = {}): JSX.Element => (
      <PortfolioMasonryView {...params} />
    ),
  },
  {
    path: '/portfolio-grid',
    renderer: (params = {}): JSX.Element => <PortfolioGridView {...params} />,
  },
  {
    path: '/company-terms',
    renderer: (params = {}): JSX.Element => <CompanyTermsView {...params} />,
  },
  {
    path: '/contact-sidebar-map',
    renderer: (params = {}): JSX.Element => (
      <ContactPageSidebarMapView {...params} />
    ),
  },
  {
    path: '/contact-page-cover',
    renderer: (params = {}): JSX.Element => (
      <ContactPageCoverView {...params} />
    ),
  },
  {
    path: '/about',
    renderer: (params = {}): JSX.Element => <AboutView {...params} />,
  },
  {
    path: '/about-side-cover',
    renderer: (params = {}): JSX.Element => <AboutSideCoverView {...params} />,
  },
  {
    path: '/product/list',
    renderer: (params = {}): JSX.Element => (
      <SingleSubscriptionProductView {...params} />
    ),
  },
  {
    path: '/pricing/:id',
    renderer: (params = {}): JSX.Element => (
      <SingleSubscriptionProductView {...params} />
    ),
  },
  {
    path: '/product-details',
    renderer: (params = {}): JSX.Element => <ProductOverview {...params} />,
  },
  {
    path: '/blog-search',
    renderer: (params = {}): JSX.Element => <BlogSearchView {...params} />,
  },
  {
    path: '/blog',
    renderer: (params = {}): JSX.Element => <BlogNewsroomView {...params} />,
  },
  {
    path: '/blog/:id',
    renderer: (params = {}): JSX.Element => (
      <BlogArticleView {...params} />
    ),
  },
  {
    path: '/story/:id',
    renderer: (params = {}): JSX.Element => (
      <StoryArticleView {...params} />
    ),
  },
  {
    path: '/blog-reach-view',
    renderer: (params = {}): JSX.Element => <BlogReachViewView {...params} />,
  },
  {
    path: '/password-reset-cover',
    renderer: (params = {}): JSX.Element => (
      <PasswordResetCoverView {...params} />
    ),
  },
  {
    path: '/password-reset-simple',
    renderer: (params = {}): JSX.Element => (
      <PasswordResetSimpleView {...params} />
    ),
  },
  {
    path: '/signin-simple',
    renderer: (params = {}): JSX.Element => <SigninSimpleView {...params} />,
  },
  {
    path: '/signin-cover',
    renderer: (params = {}): JSX.Element => <SigninCoverView {...params} />,
  },
  {
    path: '/signup-simple',
    renderer: (params = {}): JSX.Element => <SignupSimpleView {...params} />,
  },
  {
    path: '/signup-cover',
    renderer: (params = {}): JSX.Element => <SignupCoverView {...params} />,
  },
  {
    path: '/account-billing',
    renderer: (params = {}): JSX.Element => (
      <PrivateRoute>
        <AccountBillingView {...params} />{' '}
      </PrivateRoute>
    ),
  },
  {
    path: '/account',
    renderer: (params = {}): JSX.Element => (
      <PrivateRoute>
        <AccountGeneralView {...params} />,
      </PrivateRoute>
    ),
  },
  {
    path: '/account-notifications',
    renderer: (params = {}): JSX.Element => (
      <PrivateRoute>
        <AccountNotificationsView {...params} />
      </PrivateRoute>
    ),
  },
  {
    path: '/account-security',
    renderer: (params = {}): JSX.Element => (
      <PrivateRoute>
        <AccountSecurityView {...params} />,
      </PrivateRoute>
    ),
  },
  {
    path: '/not-found',
    renderer: (params = {}): JSX.Element => <NotFoundView {...params} />,
  },
  {
    path: '/not-found-cover',
    renderer: (params = {}): JSX.Element => <NotFoundCoverView {...params} />,
  },
];

export default routes;
