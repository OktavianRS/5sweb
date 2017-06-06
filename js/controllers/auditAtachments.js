angular
.module('app')
.controller('auditAtachmentsCtrl', auditAtachmentsCtrl)

auditAtachmentsCtrl.$inject = ['$scope', '$stateParams', '$rootScope', 'toast', 'ngDialog', 'auditModel'];
function auditAtachmentsCtrl($scope, $stateParams, $rootScope, toast, ngDialog, auditModel) {
    $scope.atachmentsList = [];

    $scope.fetchAtachments = function() {
        // $stateParams.audit_id
        auditModel.fetchAttachments(40, function(result) {
            const newArray = [];
            if (length > 3) {
                let counter = 0;
                result.map((val, key) => {
                    const tempArray = [];
                    tempArray.push(val);
                    if (counter === 3) {
                        counter = 0;
                        tempArray = [];
                        newArray.push(tempArray);
                    }
                });
                $scope.atachmentsList = newArray;
            } else {
                newArray.push(result);
                $scope.atachmentsList = newArray;
            }
        });
    }

    function constructor() {
        $scope.fetchAtachments();
    }
    constructor();
}