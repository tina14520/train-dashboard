export default [
  {
    _name: 'CSidebarNav',
    _children: [
      {
        _name: 'CSidebarNavItem',
        name: 'Dashboard',
        to: '/dashboard',
        icon: 'cil-speedometer',
        // badge: {
        //   color: 'primary',
        //   text: 'NEW'
        // }
      },
      {
        _name: 'CSidebarNavDropdown',
        name: 'Train Booking',
        route: '/taxiBooking',
        icon: 'cil-locomotive',
        items: [
          {
            name: 'Ticket Booking',
            to: '/taxiBooking/trip-booking'
          },
          {
            name: 'Trips Tracking',
            to: '/taxiBooking/trips-tracking'
          },
          {
            name: 'Current Status',
            to: '/taxiBooking/current-status'
          },
          {
            name: 'Follow-up',
            to: '/taxiBooking/follow-up'
          }
        ]
      },
      {
        _name: 'CSidebarNavItem',
        name: 'Attendance / Break ',
        to: '/attendance&break',
        icon: 'cil-address-book'
      },
      {
        _name: 'CSidebarNavDropdown',
        name: 'Reports',
        route: '/reports',
        icon: 'cil-notes',
        items: [
          {
            name: 'Trips Report',
            to: '/reports/trips-reports',
            // badge: {
            //   color: 'info',
            //   text: 'NEW'
            // }
          },
          {
            name: 'Booking Report',
            to: '/reports/booking-reports'
          },
          {
            name: 'Cancelled Trips',
            to: '/reports/cancelled-trips'
          },
          {
            name: 'Financial Reports',
            to: '/reports/financial-reports'
          },
          {
            name: 'Top Customers',
            to: '/reports/top-customers'
          },
          
        ]
      },
      {
       _name: 'CSidebarNavItem',
        name: 'Settings',
        to: '/settings',
        icon: 'cil-settings'
      },
      {
        _name: 'CSidebarNavDropdown',
        name: 'Users',
        route: '/users',
        icon: 'cil-user',
        items: [
          {
            name: 'Admins',
            to: '/users/admins'
          },
          {
            name: 'Customers',
            to: '/users/customers'
          },
          // {
          //   name: 'Modals',
          //   to: '/notifications/modals'
          // }
        ]
      },
      {
        _name: 'CSidebarNavItem',
         name: 'Roles',
         to: '/roles',
         icon: 'cil-list'
       },
    ]
  }
]