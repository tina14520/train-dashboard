import Vue from 'vue'
import Router from 'vue-router'

// Containers
const TheContainer = () => import('@/containers/TheContainer')

// Views
const Dashboard = () => import('@/views/Dashboard')

const Attendance = () => import('@/views/Attendance/Attendance')
const Settings=()=> import('@/views/settings/Settings')
const Roles = () => import('@/views/roles/Roles')

// Views - taxi Booking
const TripBooking = () => import('@/views/taxiBooking/TripBooking')
const CurrentStatus = () => import('@/views/taxiBooking/CurrentStatus')
const TripsTracking = () => import('@/views/taxiBooking/TripsTracking')
const FollowUp = () => import('@/views/taxiBooking/FollowUp')


// Views - Reports
const TripsReports = () => import('@/views/reports/TripsReports');
const BookingReports = () => import('@/views/reports/BookingReports');
const CancelledTrips = () => import('@/views/reports/CancelledTrips');
const FinancialReports = () => import('@/views/reports/FinancialReports');
const TopCustomers = () => import('@/views/reports/TopCustomers');


// Views - Pages
const Page404 = () => import('@/views/pages/Page404')
const Page500 = () => import('@/views/pages/Page500')
const Login = () => import('@/views/pages/Login')
// Users
const Customers = () => import('@/views/users/Customers')
const Admins=()=> import ('@/views/users/Admins')

Vue.use(Router)

// export default new Router({
//   // mode: 'hash', // https://router.vuejs.org/api/#mode
//   // linkActiveClass: 'active',
//   // scrollBehavior: () => ({ y: 0 }),
//   // routes: configRoutes()
//   mode: 'history',
//   base: process.env.BASE_URL,
//   routes: configRoutes()
// })

// function configRoutes () {
  const routes = [
    {
        path: '/dashboard/login',
        name: 'Login',
        component: Login,
    },
    {
      path: '/',
      redirect: '/dashboard',
      name: 'Home',
      component: TheContainer,
      meta: {
        secure: true
      },
      children: [
        {
          path: 'dashboard',
          name: 'Dashboard',
          component: Dashboard
        },
        {
          path: 'attendance&break',
          name: 'Attendance & Break',
          component: Attendance
        },
        {
          path: 'roles',
          name: 'Roles',
          component: Roles
        },
        {
          path: 'settings',
          name: 'Settings',
          component: Settings
        },
        {
          path: 'taxiBooking',
          redirect: '/taxiBooking/trip-booking',
          name: 'Train Booking',
          component: {
            render (c) { return c('router-view') }
          },
          meta: {
            secure: true
          },
          children: [
            {
              path: 'trip-booking',
              name: 'Ticket Booking',
              component: TripBooking
            },
            {
              path: 'current-status',
              name: 'Current Status',
              component: CurrentStatus,
              meta: {
                secure: true
              },
            },
            {
              path: 'trips-tracking',
              name: 'Trips Tracking',
              component: TripsTracking,
              meta: {
                secure: true
              },
            },
            {
              path: 'follow-up',
              name: 'Follow Up',
              component: FollowUp,
              meta: {
                secure: true
              },
            }
          ]
        },
        {
          path: 'reports',
          redirect: '/reports/trips-reports',
          name: 'Trips Reports',
          component: {
            render (c) { return c('router-view') }
          },
          meta: {
            secure: true
          },
          children: [
            {
              path: 'trips-reports',
              name: 'Trips Reports',
              component: TripsReports
            },
            {
              path: 'booking-reports',
              name: 'Booking Reports',
              component: BookingReports
            },
            {
              path: 'cancelled-trips',
              name: 'Cancelled Trips',
              component: CancelledTrips,
              meta: {
                secure: true
              },
              },
            {
              path: 'financial-reports',
              name: 'Financial Reports',
              component: FinancialReports,
              meta: {
                secure: true
              },
            },
            {
              path: 'top-customers',
              name: 'Top Customers',
              component: TopCustomers,
              meta: {
                secure: true
              },
            },
          ]
        },
        {
          path: 'users',
          redirect: '/users',
          name: 'Users',
          component: {
            render (c) { return c('router-view') }
          },
          meta: {
            secure: true
          },
          children: [
            {
              path: 'admins',
              name: 'Admins',
              component: Admins,
              meta: {
                secure: true
              },
            },
            {
              path: 'customers',
              name: 'Customers',
              component: Customers,
              meta: {
                secure: true
              },
            },
          ]
        }
      ]
    },
    {
      path: '/pages',
      redirect: '/pages/404',
      name: 'Pages',
      component: {
        render (c) { return c('router-view') }
      },
      children: [
        {
          path: '404',
          name: 'Page404',
          component: Page404
        },
        {
          path: '500',
          name: 'Page500',
          component: Page500
        },
        {
          path: 'login',
          name: 'Login',
          component: Login
        },
      ]
    }
  ]
// }
const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.secure)) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    if (!localStorage.getItem('token')) {
      next({
        path: '/dashboard/login',
        query: {
          redirect: to.fullPath
        }
      })
    } else {
      next()
    }
  } else if (to.matched.some(record => record.meta.guest)) {
    if (localStorage.getItem('token')) {
      next({
        path: '/dashboard',
        query: {
          redirect: to.fullPath
        }
      })
    } else {
      next()
    }
  } else {
    next() // make sure to always call next()!
  }
})

export default router
