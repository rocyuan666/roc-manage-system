const childProcess = require("child_process");
childProcess.exec("git pull gitee master", (err) => {
  if (err) {
    console.log("pull失败", err);
    return;
  }
  childProcess.exec("git push gitee master", (err) => {
    if (err) {
      console.log("gitee push失败", err);
    } else {
      console.log("gitee push成功");
    }
  });
  childProcess.exec("git push github master", (err) => {
    if (err) {
      console.log("github push失败", err);
    } else {
      console.log("github push成功");
    }
  });
});
