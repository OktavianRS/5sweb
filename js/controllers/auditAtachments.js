angular
.module('app')
.controller('auditAtachmentsCtrl', auditAtachmentsCtrl)

auditAtachmentsCtrl.$inject = ['$scope', '$stateParams', '$rootScope', 'toast', 'ngDialog', 'auditModel'];
function auditAtachmentsCtrl($scope, $stateParams, $rootScope, toast, ngDialog, auditModel) {
    $scope.atachmentsList = [];
    $scope.detailesList = [];

    $scope.fetchAtachments = function() {
        // $stateParams.audit_id
        auditModel.fetchAttachments($stateParams.audit_id, function(result) {
            const newArray = [];
            if (length > 5) {
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

    $scope.fetchDetailes = function() {
        auditModel.fetchDetailes($stateParams.audit_id, function(result) {
            $scope.detailesList = result;
        });
    }

    function constructor() {
        $scope.fetchAtachments();
        $scope.fetchDetailes();

    }
    constructor();
}