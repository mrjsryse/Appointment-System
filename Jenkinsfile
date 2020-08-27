pipeline {
  agent any
  stages {
    stage('Build') {
      agent any
      steps {
        echo 'Test'
      }
    }

    stage('Test') {
      steps {
        echo 'Testing'
      }
    }

    stage('Deploy') {
      steps {
        echo 'Deploy'
      }
    }

  }
  
  post{
    failure{
       mail to: 'earl_capistrano@dlsu.edu.ph',
             subject: "Failed Pipeline: ${currentBuild.fullDisplayName}",
             body: "Something is wrong with ${env.BUILD_URL}"
    }
  }
}
