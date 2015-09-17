<!DOCTYPE html>
<!--[if IE 9 ]>    <html class="ie9" lang="en" data-ng-app="singular"> <![endif]-->
<!--[if (gt IE 9)|!(IE)]><!-->
<html lang="en" data-ng-app="singular">
<!--<![endif]-->

<head>
   <meta charset="utf-8">
   <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
   <meta name="description" content="Fighto! by Cardboard Development">
   <meta name="keywords" content="pairing, notification, app">
   <title data-ng-bind="pageTitle()">Fighto!</title>
   <!-- App CSS-->
   <link rel="stylesheet" href="app/css/app.css" data-ng-if="!app.layout.isRTL">
   <link rel="stylesheet" href="app/css/apprtl.css" data-ng-if="app.layout.isRTL">
   <link rel="icon" type="image/png" href="app/img/favicon-32x32.png" sizes="32x32" />
   <link rel="icon" type="image/png" href="app/img/favicon-16x16.png" sizes="16x16" />
   <link rel="stylesheet" href="app/css/custom.css">
</head>

<body data-ng-class="{ 'layout-fixed' : app.layout.isFixed, 'aside-collapsed' : app.sidebar.isCollapsed, 'layout-boxed' : app.layout.isBoxed, 'aside-slide' : app.sidebar.slide, 'in-app': $state.includes('app')}">
   <div data-ui-view="" data-autoscroll="false" data-ng-class="app.viewAnimation" class="app-container"></div>
   <!-- App Scripts-->
   <script src="app/js/base.js"></script>
   <script src="app/js/app.js"></script>
   <script src="app/js/controllers/MainController.js"></script>
   <script src="app/js/controllers/EventDetailsController.js"></script>
   <script src="app/js/controllers/LoginController.js"></script>
  
   <script src="lib/momentjs/min/moment.min.js"></script>
   <script src="lib/momentjs/min/locales.min.js"></script>
   <script src="lib/humanize-duration/humanize-duration.js"></script>
   <script src="lib/angular-timer/dist/angular-timer.min.js"></script>
   <script src="lib/ng-file-upload/ng-file-upload-shim.min.js"></script> <!-- for no html5 browsers support -->
   <script src="lib/ng-file-upload/ng-file-upload.min.js"></script> 
   <script src="lib/momentjs/min/moment.min.js"></script>
   <script src="lib/satellizer/satellizer.min.js"></script>
   <script type="text/javascript">
       var fb_id = '<?php echo $fb_id; ?>';
   </script>
</body>

</html>