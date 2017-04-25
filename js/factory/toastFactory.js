angular.module('factory.toast', [])
    .factory('toast', ['toastr',
      function(toastr) {
        return function(type, text, description) {
          switch(type) {
            case 'error':
              toastr.error(text, description);
            case 'success':
              toastr.success(text, description);
            default:
              toastr.warning(text, description);
          }

        }
      }
    ]);
