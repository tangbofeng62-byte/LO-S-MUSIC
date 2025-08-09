// 歌词显示功能实现
// 内部歌词数据库
const LYRICS_DATABASE = {
  'Shape of You': `[00:09.930] The club isn't the best place to find a lover，So the bar is where I go.
[00:14.420] Me and my friends at the table doing shots，Drinking fast and then we talk slow.
[00:19.610] You come over and start up a conversation with just me，And trust me I'll give it a chance now.
[00:24.840] Take my hand, stop, Put Van The Man on the jukebox，And then we start to dance, and now I'm singing like.
[00:30.020] Girl, you know I want your love，Your love was handmade for somebody like me.
[00:35.280] Come on now, follow my lead，I may be crazy, don't mind me.
[00:39.660] Say, boy, let's not talk too much，Grab on my waist and put that body on me.
[00:45.140] Come on now, follow my lead，Come, come on now, follow my lead.
[00:50.320] I'm in love with the shape of you，We push and pull like a magnet do.
[00:55.340] Although my heart is falling too，I'm in love with your body.
[01:00.190] And last night you were in my room，And now my bed sheets smell like you.
[01:05.550] Every day discovering something brand new，I'm in love with your body.
[01:10.000] Oh—i—oh—i—oh—i—oh—i，I'm in love with your body.
[01:14.970] Oh—i—oh—i—oh—i—oh—i，I'm in love with your body.
[01:19.650] Oh—i—oh—i—oh—i—oh—i，I'm in love with your body.
[01:24.810] Every day discovering something brand new，I'm in love with the shape of you.
[01:30.490] One week in we let the story begin，We're going out on our first date.
[01:34.670] You and me are thrifty, so go all you can eat，Fill up your bag and I fill up a plate.
[01:39.850] We talk for hours and hours about the sweet and the sour，And how your family is doing okay.
[01:44.780] Leave and get in a taxi, we kiss in the backseat，Tell the driver make the radio play, and I'm singing like.
[01:49.990] Girl, you know I want your love，Your love was handmade for somebody like me.
[01:55.210] Come on now, follow my lead，I may be crazy, don't mind me.
[01:59.430] Say, boy, let's not talk too much，Grab on my waist and put that body on me.
[02:05.410] Come on now, follow my lead，Come, come on now, follow my lead.
[02:10.000] I'm in love with the shape of you，We push and pull like a magnet do.
[02:15.340] Although my heart is falling too，I'm in love with your body.
[02:20.190] And last night you were in my room，And now my bed sheets smell like you.
[02:25.550] Every day discovering something brand new，I'm in love with your body.
[02:30.000] Oh—i—oh—i—oh—i—oh—i，I'm in love with your body.
[02:34.970] Oh—i—oh—i—oh—i—oh—i，I'm in love with your body.
[02:39.650] Oh—i—oh—i—oh—i—oh—i，I'm in love with your body.
[02:44.810] Every day discovering something brand new，I'm in love with the shape of you.
[02:50.000] Come on, be my baby, come on.Come on, be my baby, come on.
[03:00.000] I'm in love with the shape of you，We push and pull like a magnet do.
[03:05.000] Although my heart is falling too，I'm in love with your body.
[03:10.000] And last night you were in my room，And now my bed sheets smell like you，I'm in love with your body.
[03:15.000] Come on, be my baby, come on.Come on, be my baby, come on.
[03:20.000] Come on, be my baby, come on.Come on, be my baby, come on.
[03:25.000] I'm in love with the shape of you.`,
  
  '1 AM': `[00:01.000] 作曲 : thomeboydontkill
[00:02.000] 编曲 : eeryskies.
[00:03.000] 制作人 : thomeboydontkill
[00:04.000] 录音 : CSNV stuido
[00:05.000] 混音 : 谭玉堂
[00:06.000] 母带 : 张步若
[00:19.44]我并不完美
[00:20.90]我需要爱
[00:21.84]在我拥有你的时间
[00:24.55]我只想你在
[00:25.64]不再胡思乱想
[00:27.01]自己到底特不特别
[00:29.23]甜蜜的话语
[00:30.50]OK
[00:31.36]我承认
[00:32.03]我确实着迷不浅
[00:34.22]就像是
[00:35.14]大雁盼着春风
[00:36.85]我盼着和你见面
[00:40.68]有时会控制不住的想你
[00:43.48]我早已习惯了等
[00:45.89]我想把我的爱
[00:47.24]封存在想你的一点整
[00:50.71]所有代价我都不计
[00:53.29]就当我发疯
[00:55.39]生活带给我的泥泞
[00:58.72]有你全被冲刷
[01:01.34]你像个童话
[01:03.99]出现在我身边
[01:06.21]治愈我的痛啊
[01:08.20]确实很过分
[01:10.58]我想要占有你
[01:13.77]你的每一寸肌肤
[01:16.78]都把我给迷住
[01:19.24]我承认
[01:20.81]我想要被你看作做最好的那个
[01:23.49]太过在意面子不愿说出口
[01:26.41]毋庸置疑我已深陷这其中
[01:30.54]你是否和我一样
[01:32.22]喜欢你说话的方式
[01:34.68]如果有能让时间穿越的装置
[01:36.83]我不会希望我们更早的相遇
[01:38.94]我会穿越到有我们的未来
[01:41.08]一起经历那些所谓的hard times
[01:43.80]为了你我不会被现实打败
[01:46.28]让你坚信你就是我的最爱
[01:48.72]你给我的吻成就了最好7月
[01:51.09]你是我的唯一我希望你能理解
[01:53.43]只需要相信我 dont give a thought about wat he said
[01:56.13]你是我的天使我来成为你的羽翼
[01:59.53]有时会控制不住的想你
[02:02.75]我早已习惯了等
[02:05.10]我想把我的爱
[02:06.54]封存在想你的一点整
[02:09.93]所有代价我都不计
[02:12.34]就当我发疯
[02:14.61]生活带给我的泥泞
[02:17.58]有你全被冲刷
[02:22.56]你像个童话
[02:35.04]Baby，我想要占有你
[02:42.17]想要占有你
[02:46.88]我想要占有你
[02:51.84]我想要占有你
[02:56.85]我想要占有
[02:59.10]OP：成都菲乐普文化传媒有限公司
[02:59.45]SP：亚洲华纳（北京）音乐娱乐咨询有限公司
[02:59.73]版权声明：未经著作权人书面许可，任何人不得以任何方式使用（包括翻唱、翻录等形式）`,
  'CYBERPUNK2021': `[00:00.90]作词：邓典果DDG
[00:01.11]作曲：邓典果DDG
[00:02.01]制作人：邓典果DDG、Provoke
[00:02.32]和声编写：邓典果DDG、Provoke
[00:02.57]和声：邓典果DDG
[00:02.77]录音师：邓典果DDG
[00:03.03]混音师：Provoke
[00:03.99]录音室：1508 Studio
[00:04.14]混音室：Provoke Studio
[00:04.29]母带后期制作人：Provoke
[00:04.55]OP：Warner Music Beijing Co.Ltd
[00:04.75]SP：Warner、Chappell Music Publishing Agency(Beijing)Ltd
[00:28.04]我的左半身是天使
[00:29.16]右半身是恶魔
[00:30.02]控制我每个角落
[00:31.28]让我分不清的现实
[00:32.44]就像一场游戏体验
[00:33.12]内心找不到地方落脚
[00:34.78]我的大脑就像齿轮
[00:35.89]从来不会停止转动
[00:36.67]但是经不起时间蹉跎
[00:38.29]我没闲心和教训磨合
[00:39.50]只想对抗那些无耻和龌龊
[00:41.72]也许错过了太多机会
[00:42.94]但是并没有因为选择后悔
[00:45.12]因为经历过他们都不会有的
[00:46.78]只会让我更加臭美
[00:48.51]对于谦虚有人会曲解
[00:49.93]他们会一味当你懦弱
[00:51.90]有人选择用事实证明
[00:53.27]有人也会自甘堕落
[00:55.50]那些未知的变化
[00:56.81]导致了感情太廉价
[00:58.58]还有你不想碰的谈话
[01:00.20]会让你骑虎难下
[01:02.07]然而并不需要任何同情
[01:03.74]跳进丛林
[01:04.19]寻找动物的本性
[01:05.76]保持冷静
[01:06.36]到达食物链顶端
[01:07.62]是百分百的肯定
[01:09.62]Play the RPG
[01:11.45]人生就像超梦
[01:13.36]总会有人骚动
[01:14.91]设定胜利方位
[01:16.53]用最好的装备
[01:18.20]难度在我身边
[01:20.17]但我一步登天
[01:21.69]This is Cyberpunk 2021
[01:25.33]辉煌的Nightcity 2021
[01:29.30]Cyberpunk 2021
[01:32.13]辉煌的Nightcity 2021
[01:36.49]未来给我准备了大礼
[01:38.05]但是老子必须要两份儿
[01:39.52]All I do is double check
[01:41.01]确保我是个real man
[01:42.44]不是个coward
[01:43.56]我不想切放假
[01:44.58]Where I stand is on top
[01:46.29]像最坚韧的植物长在山顶
[01:47.76]我把上升的通道全部关紧
[01:49.99]搭上雪国的列车
[01:51.36]再也不停歇让它开向了远方
[01:53.83]不能回头的路上
[01:54.74]我会像夜晚的星空一直闪光
[01:57.21]我像Orpheus开始演唱
[01:58.67]神坛的火焰被点亮
[02:00.29]不断壮大是我的展望
[02:02.11]死海的羊皮书被我卷上
[02:03.88]我把他们的意见除掉
[02:05.60]得到太多的答案无效
[02:07.82]Nobody do it like me
[02:09.19]他的剧情显得俗套
[02:10.95]摸不到的真实
[02:11.71]让我早就变得坚定
[02:12.44]让我感觉不到任何孤独寂寞
[02:14.33]没人能够让我寄托
[02:15.29]这场游戏
[02:15.80]我会完成的干净利落
[02:18.64]Play the RPG
[02:20.00]人生就像超梦
[02:21.57]总会有人骚动
[02:23.49]设定胜利方位
[02:25.16]用最好的装备
[02:26.98]难度在我身边
[02:28.65]但我一步登天
[02:30.26]This is Cyberpunk 2021
[02:33.60]辉煌的Nightcity 2021
[02:37.89]Cyberpunk 2021
[02:40.67]辉煌的Nightcity 2021`,
  'Holy Water': `[00:01.000] 作曲 : 马伯骞Victor Ma/GALI/ATM Hanson
[00:09.184]马伯骞VictorMa：
[00:09.473]Ithought shawty goinbe my wife
[00:10.302]（曾以为她会是终身伴侣）
[00:11.193]She got other plans for her life
[00:12.032]（她却另有人生轨迹）
[00:13.673]She's another Bonnie to another Clyde
[00:14.852]（化身新版雌雄大盗亡命徒）
[00:16.470]Relivin up her own life
[00:17.302]（重启属于她的新剧本）
[00:18.274]Baby mama she be livin up her own life
[00:19.420]（她活成自己的女王）
[00:20.837]Guess she blind she cant see her through her own sight
[00:21.993]（我想她应该迷茫了 难见真实镜像）
[00:23.286]Guess she want some jimmy choos and some red bottoms she stepping on me every step with her own rights
[00:25.109]（红底鞋大步向前她步步生权）
[00:27.903]Baby got her nails done hair done big eyes small waist she goin out with another guy
[00:31.038]（美甲烫发 婀娜多姿挽新欢出街）
[00:32.753]Shawty from the uptown drop down realize she up now everything she sayin was a lie
[00:35.322]（甜心坠落 谎言步步织就王座）
[00:39.208]She's a devil in disguise left me here to cry
[00:41.486]（伪天使留下我独咽泪痕）
[00:43.104](Shebe looking like an AI)
[00:43.947]（她美的不属于这个世界）
[00:45.236](What she doing out in late night)
[00:46.104]（深夜我猜不透她的下一个行动）
[00:47.810]Can't imagine other guys when they touch your thigh
[00:50.927]（难忍他人掌温游走你腰间）
[00:55.469]李玖哲Nicky Lee：
[00:56.296]Ithought shawty goin be my wife
[00:57.360]（曾以为甜心会是终身伴侣）
[00:58.555]She got other plans for her life
[00:59.608]（她却另有人生轨迹）
[01:00.863]She's another Bonnie to another Clyde
[01:02.469]（化身新版雌雄大盗亡命徒）
[01:04.038]Relivin up her own life
[01:04.889]（重启属于她的新剧本）
[01:05.905]I thought shawty goin be my wife
[01:06.938]（曾以为甜心会是终身伴侣）
[01:07.956]She got other plans for her life
[01:09.058]（她却另有人生轨迹）
[01:10.454]She's another Bonnie to another Clyde
[01:12.406]（化身新版雌雄大盗亡命徒）
[01:13.417]Relivin up her own life
[01:14.221]（重启属于她的新剧本）
[01:15.042]GALI：
[01:15.624]我眼球围绕她在偷偷转像木卫六
[01:17.520]我看到她在发光from her head to her toe
[01:18.973]（我看到她在发光 从头到脚）
[01:20.048]捕捉到她的节奏很慢像无尾熊
[01:22.329]Alexander Mcqueen相比好像也不贵重
[01:23.714]（麦昆华服 相比好像也不贵重）
[01:25.072]Baby got her nails done hair done everything did
[01:26.287]（妆发指尖 精致到发梢末节）
[01:27.751]不迷恋结尾但被这个过程灌醉
[01:29.628]不管在哪条街道 man down 裁判嘴里面的哨响 原因是因为她美到犯规
[01:31.646]（不管在哪条街道 总有人倒下 裁判嘴里面的哨响 原因是因为她美到犯规）
[01:34.272]I gotta play smart
[01:35.335]（步步为营 我玩的很聪明）
[01:35.902]连心跳被她打乱
[01:36.956]危险的空气跟二氧化碳
[01:39.568]两个香槟杯 餐盘里面摆的花瓣
[01:41.603]我想在她的ring finger上面加钻
[01:42.867]（我想在她的无名指上面加钻）
[01:43.916]可现在我需要把旧的记忆换下
[01:46.261]画面像是bullets对我不停狂轰滥炸
[01:47.188]（画面像是子弹对我不停狂轰滥炸）
[01:48.410]当我把手放在播放键上面按下
[01:50.309]像两个主人公不在同一本漫画
[02:21.637]马伯骞VictorMa:
[02:24.411]I'm on her blocklist I don't care cuz I blocked her first
[02:25.843]（不在意她黑名单 我抢先拉黑她）
[02:27.761]She for the streets she be switchin up like switchin shirts
[02:29.795]（浪迹街头 换他人如换衫）
[02:31.584]She not in love but she out there wearin all my merch
[02:32.847]（她口口声声说毫无感情 但却一直穿我的品牌）
[02:35.040]All them fugazies they be cuz I been there first
[02:37.194]（假货横飞 因我早立过标杆）
[02:39.103]She just want one night
[02:39.964]（贪图春宵）
[02:42.703]See my taillights
[02:43.850]（只配目送我尾灯）
[02:45.768]I'm back on my missions
[02:47.830]（我掌握自己的版图）
[02:48.142]I'm back on my business
[02:48.493]（我掌握自己的产业）
[02:48.984]I'm back on that stackin my million racks
[02:49.574]（我闷头把我的血汗钱赚到）
[02:50.009]I'm back on my missions
[02:50.686]（我掌握自己的版图）
[02:51.918]I'm back on my business
[02:52.371]（我掌握自己的产业）
[02:52.910]Whatever she do not really impressed
[02:53.597]（她作态难动我心）
[02:54.629]She messing around She crying out loud
[02:55.203]（她胡闹哭嚎）
[02:58.681]I take off her crown
[02:59.330]（我亲手摘下她的皇冠）
[03:00.262]Whatever she down bad bad`,
  'Most Wanted': `[00:01.000] 作曲 : V.O.B/艾志恒Asen
[00:02.000] 编曲 : Versa
[00:14.884]SouthSIde Know We The Fxxxin Most Wanted
[00:15.888]（南边知道我俩不好惹）
[00:16.894]NorthSide Know We The Fxxxin Most Wanted
[00:18.145]（北边也知道我俩不好惹）
[00:18.898]Best In Town Moxxer Fxxxin Most Wanted
[00:20.905]We R De Ace MoxxerFxxxer Most Wanted
[00:22.912]We R De Best Moxxer Fxxxer Most Wanted
[00:24.669]SouthSIde Know We The Fxxxin Most Wanted
[00:26.676]NorthSide Know We The Fxxxin Most Wanted
[00:28.682]We R De King's Moxxer Fxxxin Most Wanted
[00:30.188]V.O.B:
[00:30.438]We R MoxxerFxxxin Most Wanted Dat U Know
[00:32.446]想尽办法绞尽脑汁但你还不够
[00:34.452]Me And Ma Boy Asen
[00:35.958]声名狼藉保持冷酷是你们永远都破不掉的大诅咒
[00:38.213]我才不在乎开的价
[00:39.466]又多几块
[00:40.470]U Dont Know Why
[00:41.473]We Touch The Sky
[00:42.475]极限在我心里从来不是Limit
[00:43.981]我名字你们最喜欢的Rapper早就Said It
[00:45.988]2021 Digi Ghetto Year
[00:47.993]GreenSoldier Wit Ma Boyz想要夺走你的tears
[00:50.250]Like Drake CLB Album Of Year
[00:52.255]新时代的声音U Already Hear
[00:54.011]想要成为我们你们太过Funny
[00:55.767]生活太过硬核Like MoxxerFxxxin Onyx
[00:57.525]我歌词幻影迷踪消失在黑夜里看不到我行踪因为都知道We Fxxxin Most Wanted
[01:01.539]Hook
[01:01.539]SouthSIde Know We The Fxxxin Most Wanted
[01:02.542]（南边知道我俩不好惹）
[01:03.295]NorthSide Know We The Fxxxin Most Wanted
[01:04.800]（北边也知道我俩不好惹）
[01:05.302]Best In Town Moxxer Fxxxin Most Wanted
[01:07.058]We R De Ace MoxxerFxxxer Most Wanted
[01:09.065]We R De Best Moxxer Fxxxer Most Wanted
[01:11.072]SouthSIde Know We The Fxxxin Most Wanted
[01:13.080]NorthSide Know We The Fxxxin Most Wanted
[01:15.087]We R De King's Moxxer Fxxxin Most Wanted
[01:16.842]Asen:
[01:17.093]We the most wanted
[01:18.849]我接手过的伴奏 全部都被我杀了
[01:20.857]We the most wanted
[01:21.860]Digi Ghetto so fly
[01:23.115]我们就像2000年的Vince Carter
[01:24.620]Got your girls they want me
[01:25.624]你们都是麻雀咋个变凤凰 lil bxxxh
[01:28.132]we gettin mo money
[01:29.637]粉丝比我还疯狂
[01:30.892]他们把Small Town Kid纹在了胸膛
[01:33.400]Saint Laurent Paris my coat
[01:35.408]All White suit like GOAT
[01:36.913]我钱包胖得像营养怪兽
[01:38.668]你不可能不认识我 艾某
[01:41.178]Digi Ghetto Year we coming
[01:43.185]钻石让我脖子变得僵硬
[01:44.439]听到这句口号 老子坨子捏得绑紧
[01:46.447]我分不清黑白 所以老子不会钢琴
[01:48.453]我拿的太死了 就像死神降临
[01:50.210]see me better run
[01:50.963]when you see me i be stunnin
[01:52.217]你说唱比我耍的英雄联盟还要僵硬
[01:54.226]如果你跟我们耍 就像外卖里的苍蝇
[01:56.230]耳朵镶钻 我的牙齿上要镶金
[01:58.238]看到我的条件 好多人家找我相亲
[01:59.993]我早上起床心里只有money money money
[02:01.999]多得可以烧完 等到我办葬礼
[02:03.253]Hook
[02:03.504]SouthSIde Know We The Fxxxin Most Wanted
[02:05.009]（南边知道我俩不好惹）
[02:05.261]NorthSide Know We The Fxxxin Most Wanted
[02:07.017]（北边也知道我俩不好惹）
[02:07.268]Best In Town Moxxer Fxxxin Most Wanted
[02:09.274]We R De Ace MoxxerFxxxer Most Wanted
[02:11.282]We R De Best Moxxer Fxxxer Most Wanted
[02:13.039]SouthSIde Know We The Fxxxin Most Wanted
[02:15.046]NorthSide Know We The Fxxxin Most Wanted
[02:17.053]We R De King's Moxxer Fxxxin Most Wanted
[02:19.561]Verse By V.O.B&Asen
[02:23.322]Beat By Versa
[02:27.084]Prod By V.O.B
[02:31.097]Mixed By 李泽泰@G-Ray&Asen
[02:33.857]Mastered By 李泽泰@G-Ray
[02:34.360]Cover By Lemonice
[02:34.862]!WETHEFXXXINMOSTWANTED!`,
  '诗人说梦': `[00:00.81]作词：PO8
[00:00.96]作曲：Danny
[00:14.92]Trapped in desert barely Realize
[00:18.71]Look da oasis ahead is it real ****
[00:20.49]Or a ****** mirage
[00:22.41]No worries it's a dream at midnight
[00:26.22]But dreams n reality
[00:27.11]Have some conformity don't you be quiet
[00:29.90]Trapped in desert barely Realize
[00:33.65]Look da oasis ahead is it real ****
[00:35.42]Or a ****** mirage
[00:37.32]No worries it's a dream at midnight
[00:41.15]But dreams n reality
[00:42.06]Have some conformity don't you be quiet
[00:44.52]拜访 先墓故里
[00:46.36]落下的记忆都让我去回追
[00:48.27]伴随 烟雾触笔
[00:50.11]划过的笔尖上绽放了玫瑰
[00:51.87]书写 仙路物语
[00:53.70]把野果 咽入肚里
[00:55.66]在我的梦里面
[00:56.92]咒语念几遍 就能 颠覆物理
[00:59.27]我说 没有那可流芳百世的文墨
[01:01.70]顶多算个 文弱书生
[01:03.22]心里的猛虎在细嗅着蔷薇
[01:05.10]也难得会让自己 魂魄出征
[01:06.92]躲在那荷花叶泛舟的姑娘
[01:08.77]eh 你是否闭月羞花
[01:10.74]把名利看 淡泊了
[01:12.31]但我的 目标是登上那时代周刊
[01:14.46]趁现在暂时还清澈的眼睛
[01:16.33]记录下青城派故事的点滴
[01:18.23]包袱都减轻
[01:19.14]因为这是一场辛苦
[01:20.41]又漫长的嘻哈徒 远军
[01:22.04]现在我包里的书卷太重了
[01:24.07]不能陪你过冬天
[01:25.76]往返CDC和洛杉矶
[01:27.83]看 雷雨落东边
[01:30.04]擦干了眼角的泪渍但
[01:31.76]内心的河堤被 冲垮
[01:33.64]给梦想家留一个位置吧
[01:35.34]让刻板的框框都 崩塌
[01:37.42]24/7 在梦游古街
[01:39.30]有时很炎热but some make it rain
[01:41.17]备好了被套和松软的枕垫就准点起飞
[01:44.97]Trapped in desert barely Realize
[01:48.73]Look da oasis ahead is it real ****
[01:50.40]Or a ****** mirage
[01:52.33]No worries it's a dream at midnight
[01:56.13]But dreams n reality
[01:57.09]Have some conformity don't you be quiet
[01:59.93]Trapped in desert barely Realize
[02:03.73]Look da oasis ahead is it real ****
[02:05.34]Or a ****** mirage
[02:07.35]No worries it's a dream at midnight
[02:11.15]But dreams n reality
[02:12.10]Have some conformity don't you be quiet
[02:14.88]为什么手握着七彩的调色板
[02:16.90]我们却默认把天空画 蓝色
[02:19.13]为什么生命中有太多历险
[02:20.91]但大多人选择做 凡客
[02:22.94]因为要考进那 高校
[02:24.86]因为要使劲赚 钞票
[02:26.64]因为当挂起那船帆前
[02:28.16]神秘的藏宝图已经被烧掉
[02:30.39]睡梦里 填好的字句像
[02:32.27]静夜里 棉袄的质地让
[02:34.24]惬意的触碰感
[02:35.10]就这样从脚趾传到脊椎
[02:37.00]让阿塔卡马沙漠
[02:38.43]刮起一阵沿海的风暴
[02:40.72]就连圣保罗市中心医院的病人
[02:42.86]都全改喝中药
[02:44.37]像部乖张荒诞的影片
[02:46.44]就不打伞漫步在雨天
[02:48.31]看那白蛇杀掉了许仙
[02:50.18]万里长城从来不 起烟
[02:51.92]人们都对新奇习惯说
[02:53.43]Nono 抓住那稻草不收手
[02:56.18]看着那无力的瞳孔
[02:57.63]清晰的玻璃体早就被偷走
[02:59.49]Are you ever curious about
[03:01.14]What's on the ****** side of maria
[03:04.61]Guess you like 4 walls create ya area
[03:08.36]I'm just like PO8 aka 造梦的艺术家
[03:11.19]就不停在梦游当他们醒来后
[03:13.07]从来就没人会记住他
[03:14.89]Trapped in desert barely Realize
[03:18.78]Look da oasis ahead is it real ****
[03:20.38]Or a ****** mirage
[03:22.38]No worries it's a dream at midnight
[03:26.08]But dreams n reality
[03:27.14]Have some conformity don't you be quiet
[03:29.93]Trapped in desert barely Realize
[03:33.66]Look da oasis ahead is it real ****
[03:35.48]Or a ****** mirage
[03:37.41]No worries it's a dream at midnight
[03:41.05]But dreams n reality`,
  '给奶奶的信': `[00:01.000] 作曲 : 艾志恒Asen
[00:02.000] 编曲 : 付思瑶
[00:03.000] 录音 : 艾志恒Asen
[00:04.000] 混音 : 艾志恒Asen
[00:05.000] 母带 : Provoke
[00:25.47] This ain't a love song
[00:28.32] This ain't a love song
[00:34.24] 凌晨两点多的飞机我在城市之间穿梭
[00:36.82] 我现在还没习惯 活成了梦里面的段落
[00:39.96] 每次当我闭上双眼 好多画面就会闪过
[00:42.79] I done came long way
[00:44.10] 你没法反驳
[00:45.23] 最近发生好多事情没跟你切摆了
[00:47.75] 我把说唱变成工作 你当然可以怪我
[00:50.77] 但现在外面好多人都说我该火
[00:53.71] 每天都换新的
[00:54.89] 虽然以前你也给我买过崴货
[00:57.17] 我猜你躺在沙发上面刷抖音
[00:59.00] 你想我成材也曾送我学过Violin
[01:01.79] 买很多光碟还放周杰伦给我听
[01:04.75] 很难去说出口所以我为你写了信
[01:07.53] 现在你再也不用为我难过
[01:10.31] 其他的都不重要 对我来说
[01:13.10] 不会再孤单 身边很多朋友
[01:16.03] 我随时把你相片挂在胸口
[01:20.18] But I feel so cold, cuz I know
[01:24.24] 觉得亏欠你的太多
[01:27.01] 让你担心全都怪我
[01:29.61] 不想你说 时间还多
[01:32.56] 也会想起小时候
[01:35.36] 想让时间慢慢走
[01:38.10] 慢慢让我把你写进伴奏
[01:40.67] 能不能放慢时针的转轴
[01:43.53] 废话
[01:44.11] All them fake love
[01:45.92] I don't need it
[01:46.20] 因为你给过我的东西不可能会虚伪
[01:48.59] 又趁我不注意
[01:49.97] 往我行李箱里塞进几百
[01:51.75] 我以为我长大了
[01:53.05] 其实都是我自以为
[01:54.77] 你说过要做音乐 肯定要让别人记到
[01:57.49] 我做到的一切 I just want you to be proud
[02:00.50] 你说对讨厌的人其实可以不用礼貌
[02:03.12] 我遇到的人好多在背后捅我一刀
[02:06.08] 你不用太担心
[02:07.13] 因为担心是多余
[02:08.59] 我讲不出所以
[02:09.79] 反正混的还阔以
[02:11.45] 过生日许的愿是你不要生太多病
[02:14.32] 你看台下那么多人全在唱我的歌曲
[02:17.47] But I feel so cold, cuz I know
[02:21.44] 觉得亏欠你的太多
[02:24.11] 让你担心全都怪我
[02:26.76] 不想你说 时间还多
[02:29.79] 也会想起小时候
[02:32.60] 想让时间慢慢走
[02:35.33] 慢慢让我把你写进伴奏
[02:37.87] 能不能放慢时针的转轴`,
  '不称职的天才': `[00:00.00] 制作人：Myles William
[00:01.00] 制作人：The Elements
[00:02.00] 制作人：Stavros
[00:03.00] 作词作曲：王以太、Myles William
[00:04.00] 人声制作：王晓夫、Craig J Williams
[00:13.70]who like 谁在意 谁带领我
[00:19.34]最后没人dance with me 对嘴型 轻轻点头
[00:26.64]但愿我会lay with it play with it 潇洒放手
[00:33.67]我的歌有谁回忆 being stupid 我跪地乞求
[00:40.57]lately on my mind
[00:44.92]从不迷信的我开始对起掌纹看
[00:48.17]不停找哪条代表我的运气好
[00:51.66]猜想怎样犯错导致运气全抵消
[00:55.80]那句话 怎样回答 才不叫笨
[00:58.55]这一次要写 多少歌才不叫混
[01:02.20]参与过几个不想参与的纠葛
[01:05.45]珍惜谁却偏被谁当成了游客
[01:09.18]眼泪流下嘴角还在笑
[01:12.46]在最熟悉的路上也摔倒
[01:15.66]逃进难辨真伪的怀抱
[01:19.19]聪明一辈子 让我纵情愚笨的表达
[01:23.20]请先别给太多回应 别对我恭维
[01:26.83]别加我的微信 当我是窝囊废
[01:30.11]当我是刚 说唱的dummy
[01:32.88]看着我的眼睛只说do it do it
[01:36.28]lord please under-arrest me
[01:39.30]降低我的底线追所谓的fancy
[01:42.38]总想追逐如梦又似泡的幻影
[01:45.72]但我原本只想当个会思考的冠军
[01:49.19]我想按个暂停 开窗bring the daylight
[01:52.69]当我滚下山顶 你会怎样对待
[01:56.16]不太远的未来 或许就在现在
[01:59.46]当我成为了你口中不称职的天才
[02:02.93]How would it feel
[02:06.19]How would it feel
[02:08.66]How would it feel
[02:12.19]How would it feel
[02:16.25]我的心脏不会因为快没电而衰减
[02:21.80]我的信仰不会因为世界变而改变
[02:25.27]time is running out 即将进入新的白天
[02:28.66]跟随我步调 别被忘记在了外面
[02:31.97]坐在右边望向废墟怀念
[02:35.54]没有眼泪依旧情不自禁挥手再见
[02:38.96]曾盘旋在头顶的 被吞进了海面
[02:42.32]我还爱着伤害过也伤害我的世界
[02:45.77]向它再借五万年 只因你还没看见
[02:48.80]请别现在就翻篇 时间慢点再慢点
[02:51.54]我看见他们在哭泣 因为身上长斑点
[02:54.95]第一天到第三年 斑点不停长满
[02:58.17]how would it feel tell me how would it feel
[03:00.93]被这世界当对手
[03:02.76]曾也彼此追求
[03:04.26]你这天才注定进退两难
[03:06.78]与不被理解相伴
[03:08.47]若你我有幸留到最后现实不会相反
[03:11.83]新的江山
[03:13.70]谁来讲完
[03:16.53]我的良善
[03:17.95]我的港湾
[04:19.40]who like 谁在意 谁带领我
[04:26.42]最后没人dance with me 对嘴型 轻轻点头
[04:33.39]但愿我会lay with it play with it 潇洒放手
[04:40.24]我的歌有谁回忆 being stupid 我跪地乞求
[05:15.13] 管乐：Anwar Sawyer
[05:15.49] 弦乐：Jeremy Green
[05:15.84] 合成器：Manny
[05:16.20] 贝斯：孟宇
[05:16.56] 人声：王以太
[05:16.91] 和音：王以太、Myles William, Alexis Moraites, Danny Boy, Stavros,
[05:17.27] Enmanuel Mendez, Daceytheband, Max Kupetz, Helena Gao, Kim Hu,
[05:17.63] 孟宇, Terry, Yitai wife, Mercy, Erica Yang
[05:17.98] 录音师：Zach Digrigorio at Dallas' House
[05:18.34] 录音师：James Kirk and Brad at Goldigger Studios in Los Angeles.
[05:18.70] 录音师：Stavros Tsouruhas at SUITE500 in Los Angeles, California.
[05:19.06] 混音：Mike "Pizza" Piazza ,派克特
[05:19.41] 母带：Dale Becker
[05:19.77] 音频编辑：小武`,
  '焦虑': `[00:00.000] 作词 : 艾志恒Asen/Maikon Flocka Flame
[00:01.000] 作曲 : 艾志恒Asen/Maikon Flocka Flame
[00:14.84]焦虑
[00:16.06]Prod.AriaTheProducer
[00:17.24]Asen
[00:19.01]我有时开心但我有时也很焦虑
[00:21.52]有好多回忆在我身上留下烙印
[00:23.98]想的太多总是让我变得消极
[00:25.99]All these cash really rules everything around me
[00:28.80]This rap sh but I can not live without it
[00:31.14]不理解你的千万不要去讲道理
[00:33.58]属于我的就是我的 不要着急
[00:35.49]未来就在你的眼前永远无法逃避
[00:38.55]Stay true to myself
[00:39.91]我才对得起我的天赋
[00:41.36]我把每次现场当成最后一次演出
[00:43.81]我去节目不像他们只为混个脸熟
[00:46.20]看小镇男孩 我就像是哥谭市的蝙蝠
[00:48.61]以前说过谎话 现在只想变得真诚
[00:51.12]谢帝told me 他会说唱即使身无分文
[00:53.55]Welcome to the jungle
[00:54.57]丛林法则 适者生存
[00:56.12]但包包里"请揣满人民币"这才是根本
[00:58.24]Reminiscin' about them old days ,fxxk tomorrow
[01:00.84]我也想前进但是回忆把我拖走
[01:03.34]我把Small Town Kid文在左手
[01:05.51]小镇它是我的过去也是我的所有
[01:08.03]除了我内心的安宁 其他全部fxxk off
[01:10.76]这是我的生活没有人能插手
[01:13.06]See my eyes on fire but my heart cold
[01:15.53]Be my own boss 我挣脱这枷锁
[01:17.99]有人说话太过狠毒就像嘴里含着砒霜
[01:20.59]但有人给你希望 可我从不信鸡汤
[01:23.26]我也许这辈子穿不上衣柜里的西装
[01:25.83]说着我的故事虽然肯定会被遗忘
[01:27.66]他们说的都是假的
[01:29.30]不管他们花了多少心血
[01:31.12]你和你的兄弟没你歌里说的亲切
[01:33.57]好多人都活了一生但他活不明白
[01:35.92]当我死去这个世界还有我的音乐
[01:38.24]我有时开心但我有时也很焦虑
[01:40.27]有好多回忆在我身上留下烙印
[01:42.70]想的太多总是让我变得消极
[01:44.76]All these cash really rules everything around me
[01:47.51]This rap sh but I can not live without it
[01:49.95]不理解你的千万不要去讲道理
[01:52.50]属于我的就是我的 不要着急
[01:54.61]未来就在你的眼前永远无法逃避
[01:57.54]Maikon Flocka Flame
[01:58.01]I be feeling so anxious
[01:59.89]感到忐忑
[02:00.84]面对那些谴责 有时开始变得
[02:03.35]质疑我自己的选择 因为环境险恶
[02:06.26]少有晴朗天色
[02:07.90]我不相信神明我也不信上帝
[02:09.77]所以我选择努力即便汗水湿透上衣
[02:12.31]like what they say cash does rule everything around me
[02:14.88]让我变得焦虑 多少诱惑要去抗拒
[02:17.33]有些狼心狗肺表面充满诚意
[02:19.73]他们在你后背 贬低在你面前对你肯定
[02:22.20]但我从不后悔即便遭受冷遇
[02:24.70]Thinkin' back to the old days I just got my twenty
[02:27.65]there was no way we could make a penny
[02:29.71]但我记忆犹新 what my brothers told me
[02:32.19]有天出人头地
[02:33.24]赚满钞票放进兜里
[02:34.67]掌控这场游戏
[02:35.56]把命运握在手心
[02:36.18]有天出人头地
[02:38.78]从SS到Wave Gang这想法一直发酵
[02:39.85]争分夺秒cuz I don't wanna be knocked out from this game
[02:42.58]不想表面功夫做的花哨
[02:44.40]所以在每首歌里我都用出我的杀招
[02:47.35]过去说的话在我耳边反复
[02:49.41]曾经犯错现在我也希望得到宽恕
[02:51.76]我四处环顾
[02:52.93]多少人都倒在半路
[02:54.57]我知道未来没有坦途
[02:56.18]选择义无反顾`,
  'Julie': `[00:00.000] 作词 : thomeboydontkill
[00:01.000] 作曲 : thomeboydontkill
[00:09.686]Mixed by 李承钛
[00:21.688]my julie
[00:22.437]我的朱丽叶
[00:23.439]make my heart in two pieces
[00:24.184]让我心碎
[00:25.937]dont know why you always mad at me
[00:28.623]不知道你为什么要生我的气
[00:31.875]actually julie
[00:32.375]实际上
[00:33.876]陷入你的陷阱
[00:36.627]我想给你弹琴
[00:39.376]告诉你我不再滥情
[00:43.126]oh my juliet x4
[00:47.877]你是我的朱丽叶
[00:54.126]julie
[00:54.625]我的朱丽
[00:55.374]i might go buy u sum jewlery
[00:56.124]我给你买一些首饰
[00:58.123]照片上的我和你
[01:00.623]我的心被你锁紧
[01:04.378]my julie
[01:05.123]我的朱丽
[01:06.123]我们的爱就像movie
[01:08.623]2500km
[01:11.376]两颗心还是那么近
[01:15.123]你送我的衣服我一直在穿
[01:17.875]属于我们的相册我一直在翻
[01:21.877]遇见你前没有对手
[01:24.376]而现在你就是我对手
[01:25.874]my julie
[01:26.873]我的朱丽叶
[01:27.374]make my heart in two pieces
[01:28.625]让我心碎
[01:30.127]dont know why you always mad at me
[01:31.626]不知道你为什么要生我的气
[01:35.624]actually julie
[01:36.623]实际上
[01:37.876]陷入你的陷阱
[01:40.627]我想给你弹琴
[01:43.376]告诉你我不再滥情
[01:46.873]oh my juliet x4
[01:52.623]我的朱丽叶啊`,
  'Chillin‘': `[00:15.00]清晨棉被外的冷空气，把我推回被里睡觉。
[00:18.00]速溶咖啡味道很中意，不用什么昂贵的配料。
[00:21.00]听着阳台外生的炉火，吞噬木材的声音很清脆。
[00:25.00]不需要任何的包装和辅佐，将会变成这圈子的新贵。
[00:30.00]And we're smokin' we smokin' drinkin' we drinkin'，赚的钱要赶紧花。
[00:33.00]每天都要活尽兴。
[00:37.00]And we're smokin' we smokin' drinkin' we drinkin'，下午一直呆在家。
[00:40.00]循环老歌一直听，当下午镶满金色的阳光。
[00:43.00]烤热每个公寓的落地窗，大西岸海风的咸涩。
[00:47.00]冲淡姑娘发丝的茉莉香，计划周末出行的朋克。
[00:50.00]不断踏出破机车的轰鸣，在这洛杉矶的街道上。
[00:53.00]挥洒墨西哥风情。
[00:56.00]We be like vroom vroom vroom clats bingbom，消灭了所有的宅男。
[00:59.00]Get out from gloom room to shopping mall，和朋友或是和情人。
[01:02.00]自由的灵魂从来不用拟行程，我们的目标在云层穿上了。
[01:06.00]Hood moon boot jumpin suit，从白天 high 到了凌晨。
[01:09.00]美金都塞进了包包，买一辆二手的 toyota。
[01:12.00]交给了 jwar 他车技很高超，要赶去好莱坞录歌的 11。
[01:15.00]在后座上不停地唠叨，打开了蓝牙用车载放 zensoul 的 beat。
[01:19.00]感受到身后的力，让鼓点麻醉我神经像 mental molly。
[01:24.00]在 round 2 的拐角处往里边走，去买 vintage 复古店里的羊皮烟斗。
[01:29.00]Fairfax on sale 的白 t，从今年六月就穿到年底。
[01:33.00]对那些 fake Givenchy Prada b***h，就是不放在眼里。
[01:37.00]Smokin' we smokin' drinkin' we drinkin'，赚的钱要赶紧花。
[01:41.00]每天都要活尽兴，And we're smokin' we smokin' drinkin' we drinkin'。
[01:46.00]下午一直呆在家，循环老歌一直听。
[01:49.00]总在某个 downtown 的酒吧，会看到团队卖力唱到零点。
[01:53.00]期待 nyc 大幅横跨西雅图，全美各地都会巡演。
[01:56.00]从来没有精雕饰品的衣冠 eh，**** 清高自诩的西餐妹。
[01:59.00]Talk real s**t 哥们儿方向一致，把充满歧视的牌匾都给踢翻 eh。
[02:03.00]从不让烟雾入肺，Red wine red paid。
[02:05.00]好莱坞山上的风景，缓解眼里的疲惫。
[02:07.00]Late night get laid，音乐像水把我冲醒。
[02:09.00]有多少小孩在 venice 海滩，为将来的梦想而宣了誓。
[02:13.00]但又在成年后为金钱，在剥夺自由的合约上签了字。
[02:18.00]And I kinda feel da nowadays even a mute may rap，Ain't no discrimination I mean those lil - fake - ass。
[02:25.00]Say ya rock with lambo erday shopping rollie on some diamond st，Back in studio they still can't be ****in with the timing st。
[02:45.00]And we'er smokin' we smokin' drinkin' we drinkin'，赚的钱要赶紧花。
[02:49.00]每天都要活尽兴，And we're smokin' we smokin' drinkin' we drinkin'。
[02:53.00]下午一直呆在家，循环老歌一直听。
[03:01.00]Yo this is PO8 2017 from cdc to los angeles，USC representing shout out to my homie Noflex。`
};

class LyricsDisplay {
  constructor() {
    this.audioPlayer = document.getElementById('audioPlayer');
    this.lyricsListElement = document.getElementById('lyricsList');
    this.lyricsContainer = document.getElementById('lyricsContainer');
    this.currentSong = null;
    this.lyrics = [];
    this.lyricsTimer = null;
    this.isScrolling = false;
    this.activeIndex = -1;

    // 初始化事件监听
    this.initEvents();
  }

  initEvents() {
    // 监听音频播放事件
    this.audioPlayer.addEventListener('play', () => this.startLyricsTimer());
    this.audioPlayer.addEventListener('pause', () => this.stopLyricsTimer());
    this.audioPlayer.addEventListener('timeupdate', () => this.updateLyrics());
    this.audioPlayer.addEventListener('ended', () => this.resetLyrics());
  }

  // 加载歌词
  loadLyrics(songName) {
    // 停止当前的歌词计时器
    this.stopLyricsTimer();

    // 更新当前歌曲
    this.currentSong = songName;
    this.activeIndex = -1;
    this.lyricsListElement.innerHTML = '';

    try {
      // 从内部数据库获取歌词
      let lyricText;
      if (LYRICS_DATABASE[songName]) {
        lyricText = LYRICS_DATABASE[songName];
      } else if (songName.includes('不称职的天才') && LYRICS_DATABASE['不称职的天才']) {
        lyricText = LYRICS_DATABASE['不称职的天才'];
      } else if (songName.includes('焦虑') && LYRICS_DATABASE['焦虑']) {
        lyricText = LYRICS_DATABASE['焦虑'];
      } else if (songName.includes('Chillin')) {
        lyricText = LYRICS_DATABASE['Chillin‘'] || '';
      } else if (songName.includes('Julie')) {
        lyricText = LYRICS_DATABASE['Julie'] || '';
      } else {
        // 默认使用第一首歌词
        const firstSong = Object.keys(LYRICS_DATABASE)[0];
        lyricText = LYRICS_DATABASE[firstSong] || '';
      }

      if (!lyricText) {
        throw new Error('未找到歌词数据');
      }

      this.parseLyrics(lyricText);
      this.displayLyrics(); // 初始显示歌词

      // 如果音频正在播放，启动计时器
      if (!this.audioPlayer.paused) {
        this.startLyricsTimer();
      }
    } catch (error) {
      console.error('加载歌词失败:', error);
      this.displayError('歌词加载失败');
    }
  }

  // 显示错误信息
  displayError(message) {
    this.lyricsListElement.innerHTML = '';
    const errorElement = document.createElement('p');
    errorElement.className = 'lyric-item text-white/70 text-sm';
    errorElement.textContent = message;
    this.lyricsListElement.appendChild(errorElement);
  }

  // 解析歌词
  parseLyrics(text) {
    this.lyrics = [];
    this.metadata = {};
    const lines = text.split('\n').filter(line => line.trim());
    const validLines = lines.length;

    // 如果没有有效歌词行，设置空歌词数组
    if (validLines === 0) {
      this.lyrics = [];
      return;
    }

    // 移除所有可能的元数据行，只保留歌词行
    const lyricLines = lines.filter(line => {
      const trimmedLine = line.trim();
      // 只保留带时间戳的行或看起来像歌词的行
      return /^\[\d+:\d+\.\d{2,3}\]/.test(trimmedLine) || trimmedLine.length > 0;
    });

    // 检查是否有带时间戳的歌词行 (支持[mm:ss.SS]和[mm:ss.SSS]格式)
    const hasTimestamp = lyricLines.some(line => /^\[\d+:\d+\.\d{2,3}\]/.test(line.trim()));

    if (hasTimestamp) {
      // 解析带时间戳的歌词
      lyricLines.forEach(line => {
        const trimmedLine = line.trim();
        const timestampMatch = trimmedLine.match(/^\[(\d+):(\d+\.\d+)\]/);
        if (timestampMatch) {
          const minutes = parseInt(timestampMatch[1], 10);
          const seconds = parseFloat(timestampMatch[2]);
          const totalSeconds = minutes * 60 + seconds;
          const text = trimmedLine.replace(/^\[\d+:\d+\.\d+\]/, '').trim();

          if (text) {
            this.lyrics.push({
              time: totalSeconds,
              text: text
            });
          }
        }
      });

      // 按时间戳排序
      this.lyrics.sort((a, b) => a.time - b.time);
    } else {
      // 为无时间戳的歌词创建时间戳（按进度百分比分配）
      const validLyricLines = lyricLines.filter(line => line.trim());
      validLyricLines.forEach((line, index) => {
        if (line.trim()) {
          const time = (index / (validLyricLines.length - 1)) * 100;
          this.lyrics.push({
            time,
            text: line.trim()
          });
        }
      });
    }

    // 不再显示元数据
  }

  // 显示元数据方法已删除
  displayMetadata() {
    // 空实现，不再显示元数据
  }

  // 显示歌词列表 - 严格显示5句，当前歌词在第三行
  displayLyrics(activeIndex = -1) {
    this.lyricsListElement.innerHTML = '';
    this.lyricsListElement.className = 'lyrics-container space-y-3 flex flex-col items-center justify-center min-h-[120px]';

    // 如果没有歌词，显示提示
    if (!this.lyrics.length) {
      const emptyElement = document.createElement('p');
      emptyElement.className = 'lyric-item text-white/70 text-sm';
      emptyElement.textContent = '暂无歌词';
      this.lyricsListElement.appendChild(emptyElement);
      return;
    }

    // 计算要显示的歌词范围
    let startIndex = 0;
    let endIndex = Math.min(4, this.lyrics.length - 1);

    if (activeIndex !== -1) {
      // 确保当前歌词在第三行(索引2)
      startIndex = Math.max(0, activeIndex - 2);
      endIndex = startIndex + 4;

      // 如果结束索引超出范围，则调整起始索引
      if (endIndex > this.lyrics.length - 1) {
        endIndex = this.lyrics.length - 1;
        startIndex = Math.max(0, endIndex - 4);
      }
    }

    // 确保显示5行
    const displayCount = endIndex - startIndex + 1;
    const emptyLinesBefore = Math.max(0, 2 - (activeIndex !== -1 ? activeIndex - startIndex : -2));
    const emptyLinesAfter = Math.max(0, 4 - displayCount - emptyLinesBefore);

    // 添加前面的空行
    for (let i = 0; i < emptyLinesBefore; i++) {
      const emptyElement = document.createElement('p');
      emptyElement.className = 'lyric-item text-white/10 text-sm h-8';
      emptyElement.textContent = ' ';
      this.lyricsListElement.appendChild(emptyElement);
    }

    // 显示范围内的歌词
    for (let i = startIndex; i <= endIndex; i++) {
      const lyric = this.lyrics[i];
      const lyricElement = document.createElement('p');
      lyricElement.textContent = lyric.text;
      lyricElement.className = 'lyric-item text-white/70 text-sm h-8 flex items-center justify-center';
      lyricElement.dataset.index = i;
      lyricElement.style.transition = 'all 0.5s cubic-bezier(0.22, 1, 0.36, 1)';

      // 如果是当前播放的歌词，设置高亮样式
      if (i === activeIndex) {
        lyricElement.classList.remove('text-white/70', 'text-white/50', 'text-white/30');
        lyricElement.classList.add('text-orange-400', 'font-bold', 'scale-125', 'text-base', 'drop-shadow-lg');
      } else if (i < activeIndex) {
        // 已播放的歌词
        lyricElement.classList.remove('text-white/70', 'text-white/30', 'text-orange-400', 'font-bold', 'scale-125', 'drop-shadow-lg');
        lyricElement.classList.add('text-white/50');
      } else {
        // 未播放的歌词
        lyricElement.classList.remove('text-white/70', 'text-white/50', 'text-orange-400', 'font-bold', 'scale-125', 'drop-shadow-lg');
        lyricElement.classList.add('text-white/30');
      }

      this.lyricsListElement.appendChild(lyricElement);
    }

    // 添加后面的空行
    for (let i = 0; i < emptyLinesAfter; i++) {
      const emptyElement = document.createElement('p');
      emptyElement.className = 'lyric-item text-white/10 text-sm h-8';
      emptyElement.textContent = ' ';
      this.lyricsListElement.appendChild(emptyElement);
    }
  }

  // 开始歌词计时器
  startLyricsTimer() {
    if (this.lyricsTimer) {
      clearInterval(this.lyricsTimer);
    }

    this.lyricsTimer = setInterval(() => {
      this.updateLyrics();
    }, 300);
  }

  // 停止歌词计时器
  stopLyricsTimer() {
    if (this.lyricsTimer) {
      clearInterval(this.lyricsTimer);
      this.lyricsTimer = null;
    }
  }

  // 更新歌词显示
  updateLyrics() {
    if (!this.lyrics.length) {
      return;
    }

    const currentTime = this.audioPlayer.currentTime;
    const duration = this.audioPlayer.duration || 100;

    // 检查歌词时间戳是秒数还是百分比
    const usesSeconds = this.lyrics.some(lyric => lyric.time > 100);

    // 找到当前应该显示的歌词
    let currentLyricIndex = -1;
    if (usesSeconds) {
      // 时间戳是秒数
      for (let i = this.lyrics.length - 1; i >= 0; i--) {
        if (this.lyrics[i].time <= currentTime) {
          currentLyricIndex = i;
          break;
        }
      }
    } else {
      // 时间戳是百分比
      const progress = (currentTime / duration) * 100;
      for (let i = this.lyrics.length - 1; i >= 0; i--) {
        if (this.lyrics[i].time <= progress) {
          currentLyricIndex = i;
          break;
        }
      }
    }

    // 只有当索引变化时才更新显示，避免不必要的重绘
    if (currentLyricIndex !== -1 && currentLyricIndex !== this.activeIndex) {
      this.activeIndex = currentLyricIndex;
      // 显示5句歌词，当前歌词在第三行
      this.displayLyrics(currentLyricIndex);

      // 获取更新后的歌词元素并滚动到当前歌词
      const lyricElements = this.lyricsListElement.querySelectorAll('.lyric-item');
      // 找到当前激活的歌词元素（应该是第3个元素，索引为2）
      if (lyricElements.length > 0) {
        // 确保滚动到可视区域的中间
        this.scrollToLyric(lyricElements[Math.min(2, lyricElements.length - 1)]);
      }
    }
  }

  // 滚动到当前歌词 - 优化版（确保中间显示）
  scrollToLyric(element) {
    // 确保容器和元素存在
    if (!this.lyricsContainer || !element) return;

    this.isScrolling = true;

    // 使用requestAnimationFrame立即开始滚动检测
    requestAnimationFrame(() => {
      const containerRect = this.lyricsContainer.getBoundingClientRect();
      const elementRect = element.getBoundingClientRect();

      // 计算目标位置（确保歌词居中）
      const targetPosition = element.offsetTop - (containerRect.height / 2) + (elementRect.height / 2);
      const startPosition = this.lyricsContainer.scrollTop;
      const distance = targetPosition - startPosition;
      const duration = 500; // 增加滚动时间，使动画更流畅
      let startTime = null;

      // 自定义平滑滚动动画
      const animation = (currentTime) => {
        if (!startTime) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const progress = Math.min(timeElapsed / duration, 1);
        // 使用更自然的缓动函数
        const easeProgress = 0.1 + 0.9 * (1 - Math.pow(2, -10 * progress));
        this.lyricsContainer.scrollTop = startPosition + distance * easeProgress;

        if (progress < 1) {
          requestAnimationFrame(animation);
        } else {
          // 确保滚动到精确位置
          this.lyricsContainer.scrollTop = targetPosition;
          // 立即释放滚动锁，不再等待
          this.isScrolling = false;
        }
      };

      requestAnimationFrame(animation);
    });
  }

  // 重置歌词显示
  resetLyrics() {
    this.stopLyricsTimer();
    this.activeIndex = -1;
    this.displayLyrics(); // 显示空歌词列表或提示
    this.lyricsContainer.scrollTop = 0;
  }
}

// 初始化歌词显示功能
// 添加测试函数，帮助手动测试歌词同步
function testLyricsSync(timeInSeconds) {
  if (window.lyricsDisplay) {
    console.log(`测试歌词同步，模拟播放时间: ${timeInSeconds.toFixed(2)}秒`);
    // 保存当前播放时间
    const originalTime = window.lyricsDisplay.audioPlayer.currentTime;
    // 设置模拟播放时间
    window.lyricsDisplay.audioPlayer.currentTime = timeInSeconds;
    // 触发歌词更新
    window.lyricsDisplay.updateLyrics();
    // 恢复原始播放时间
    setTimeout(() => {
      window.lyricsDisplay.audioPlayer.currentTime = originalTime;
    }, 1000);
  } else {
    console.error('歌词显示功能尚未初始化');
  }
}

document.addEventListener('DOMContentLoaded', () => {
  try {
    const lyricsDisplay = new LyricsDisplay();
    // 假设默认加载第一首歌的歌词
    // 实际应用中，应该根据当前播放的歌曲来加载对应的歌词
    setTimeout(() => {
      lyricsDisplay.loadLyrics('不称职的天才');
    }, 500);
    // 暴露到全局，方便调试
    window.lyricsDisplay = lyricsDisplay;
    // 暴露测试函数到全局
    window.testLyricsSync = testLyricsSync;
  } catch (error) {
    console.error('歌词显示功能初始化失败:', error);
  }
});