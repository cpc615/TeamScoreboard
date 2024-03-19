function createScoreboard() {
    const numTeams = document.getElementById('numTeams').value;
    const scoreboard = document.getElementById('scoreboard');
    scoreboard.innerHTML = '';
  
    for (let i = 1; i <= numTeams; i++) {
      const teamDiv = document.createElement('div');
      teamDiv.className = 'team';
      teamDiv.innerHTML = `
        <h2>Team ${i}</h2>
        <div class="score">0</div>
        <button class="add" onclick="changeScore(this, 1)">Add Point</button>
        <button class="subtract" onclick="changeScore(this, -1)">Subtract Point</button>
      `;
      scoreboard.appendChild(teamDiv);
    }
    document.getElementById('rankBtn').style.display = 'inline-block';
  }
  
  function changeScore(button, increment) {
    const scoreDiv = button.parentElement.querySelector('.score');
    let score = parseInt(scoreDiv.textContent, 10);
  
    // 检查score是否是一个有效数字
    if (!isNaN(score)) {
      score += increment;
    } else {
      // 如果score不是数字，我们将它设为0
      score = 0;
    }
  
    scoreDiv.textContent = score;
  }
  
  function showRanking() {
    const rankingDiv = document.getElementById('ranking');
    rankingDiv.innerHTML = '';
  
    const teams = Array.from(document.querySelectorAll('.team')).map(team => ({
      name: team.querySelector('h2').textContent,
      score: parseInt(team.querySelector('.score').textContent)
    }));
  
    teams.sort((a, b) => b.score - a.score);
  
    const list = document.createElement('ol');
    teams.forEach(team => {
      const item = document.createElement('li');
      item.textContent = `${team.name}: ${team.score}`;
      list.appendChild(item);
    });
  
    rankingDiv.appendChild(list);
  }
  
  // 隐藏排名按钮，直到计分板被创建
  document.getElementById('rankBtn').style.display = 'none';