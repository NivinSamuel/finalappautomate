pipeline {
    agent any

    tools {
        nodejs 'node16'
    }

    environment {
        BROWSERSTACK_USERNAME = credentials('browserstack-username')
        BROWSERSTACK_ACCESS_KEY = credentials('browserstack-accesskey')
        BROWSERSTACK_BUILD_NAME = "jenkins-${JOB_NAME}-${BUILD_NUMBER}" // ✅ IMPORTANT: Set build name properly
    }

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/NivinSamuel/finalappautomate.git'
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }

        stage('Run Tests on BrowserStack') {
            steps {
                browserstack(credentialsId: '1bb72bec-9071-456e-994a-368e3aa8d5ee') { // ✅ Important
                    sh '''
                      echo "Running Nightwatch on BrowserStack with build: $BROWSERSTACK_BUILD_NAME"
                      npm run single-android
                    '''
                }
                sleep time: 120, unit: 'SECONDS' // Give BrowserStack a few seconds to register the build
                browserStackReportPublisher 'automate' // ✅ Correct position
            }
        }
    }

    post {
        always {
            archiveArtifacts artifacts: '**/tests_output/**/*.*', allowEmptyArchive: true
            echo 'Build finished!'
        }
    }
}
