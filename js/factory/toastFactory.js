angular.module('factory.toast', [])
    .factory('toast', ['toastr',
      function(toastr) {
        return function(type, text, description) {
          switch(type) {
            case 'error':
              return toastr.error(text, description);
            case 'success':
              return toastr.success(text, description);
            default:
              return toastr.warning(text, description);
          }

        }
      }
    ]);
