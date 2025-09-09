# To learn more about how to use Nix to configure your environment
# see: https://developers.google.com/idx/guides/customize-idx-env
{ pkgs, ... }: {
  # Which nixpkgs channel to use.
  channel = "stable-24.05"; # or "unstable"

  # Use https://search.nixos.org/packages to find packages
  packages = [
     pkgs.nodejs_22
     pkgs.jdk19
     pkgs.nodePackages.nodemon
  ];


  # Sets environment variables in the workspace
  env = {
   # Enable AppCheck for additional security for critical endpoints.
   # Follow the configuration steps in the README to set up your project.
   # ENABLE_APPCHECK = "TRUE";
   LOCAL_RECOMMENDATION_SERVICE = "http://127.0.0.1:8084";
   GOOGLE_PROJECT = "coffee-spark-sample-app-9d2e2";
   CLOUDSDK_CORE_PROJECT = "coffee-spark-sample-app-9d2e2";
   TF_VAR_project = "coffee-spark-sample-app-9d2e2";
   # Flip to true to help improve Angular
   NG_CLI_ANALYTICS = "false";
   # Quieter Terraform logs
   TF_IN_AUTOMATION = "true";
  };
  idx = {
    # Search for the extensions you want on https://open-vsx.org/ and use "publisher.id"
    extensions = [
     "hashicorp.terraform"
     "ms-vscode.js-debug"
     "angular.ng-template"
    ];

    # Workspace lifecycle hooks
    workspace = {
      onCreate = {
        # Set up the backend API and install dependencies
        npm-install = ''
          cd client/web/angular-customer-app
          npm ci --no-audit --prefer-offline --no-progress --timing || npm i --no-audit --no-progress --timing
        '';
        default.openFiles = [
          "client/web/angular-customer-app/README.md"
          "client/web/angular-customer-app/src/app/services/chat.service.ts"
        ];
      };
      # Runs when the workspace is (re)started
      onStart = {
      };
    };

    # Enable previews
    previews = {
      enable = true;
      previews = {
        web = {
          # Run "npm run dev" with PORT set to Firebase Studio's defined port for previews,
          # and show it in the web preview panel
          cwd = "client/web/angular-customer-app";
          command = ["npm" "run" "start" "--" "--port" "$PORT" "--host" "0.0.0.0" "--disable-host-check"];
          manager = "web";
          env = {
            # Environment variables to set for your server
            PORT = "$PORT";
          };
        };
      };
    };
  };
}
