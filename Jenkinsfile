pipeline {
    agent any

    tools {
        nodejs 'node16'
    }

    environment {
        BROWSERSTACK_USERNAME = credentials('browserstack-username')
        BROWSERSTACK_ACCESS_KEY = credentials('browserstack-accesskey')
        BROWSERSTACK_BUILD_NAME = "jenkins-${JOB_NAME}-${BUILD_NUMBER}" // ✅ ADD THIS LINE
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
                sh 'npm run single-android' // will read BROWSERSTACK_BUILD_NAME from env
            }
        }
    }

    post {
        always {
            archiveArtifacts artifacts: '**/tests_output/**/*.*', allowEmptyArchive: true
        }
    }
}
