/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChevronLeft, 
  X, 
  CheckCircle2, 
  AlertCircle, 
  LayoutGrid, 
  MessageSquare, 
  Send,
  MoreHorizontal,
  ThumbsUp,
  ThumbsDown,
  FileText
} from 'lucide-react';

type Difficulty = 'Easy' | 'Medium' | 'Complex';

interface Review {
  text: string;
  sentiment: 'Positive' | 'Negative';
}

const REVIEWS: Record<Difficulty, Review[]> = {
  Easy: [
    { text: "这是一部非常精彩的小制作，拍摄手法非常朴实。\n它给整部作品带来了一种令人慰藉的真实感。", sentiment: "Positive" },
    { text: "冗长、乏味、令人反感。我从未如此高兴地看到片尾字幕出现。\n我不敢相信我竟然在这一堆垃圾上浪费了两个小时的人生。", sentiment: "Negative" },
    { text: "我觉得这是一个度过炎热夏日周末的绝佳方式。\n坐在空调影院里，看一部轻松愉快的喜剧。", sentiment: "Positive" },
    { text: "基本上讲的是一个家庭里的小男孩觉得壁橱里有僵尸。\n这部电影节奏太慢了，而且演技简直糟糕透顶。", sentiment: "Negative" },
    { text: "彼得·马泰的《金钱时代的爱情》是一部视觉效果极佳的电影。\n马泰先生为我们生动地描绘了人际关系的图景。", sentiment: "Positive" },
    { text: "这可能是我有史以来最喜欢的电影，一个关于无私、牺牲和奉献的故事。\n等等，我想的是另一部电影。这部其实非常糟糕。", sentiment: "Negative" },
    { text: "我鼓励每个人都去看看这部电影。这是一个关于伟人的伟大故事。\n它制作精良，演员的演技也是顶尖水平。", sentiment: "Positive" },
    { text: "这个节目在70年代是一个惊艳、新鲜且具有创新性的想法。\n现在它只是一个被用烂了的陈旧公式，毫无新意。", sentiment: "Negative" },
    { text: "演员阵容由业内一些最有才华的演员组成。\n他们真正赋予了角色生命，让你关心他们的命运。", sentiment: "Positive" },
    { text: "我在试映会上看了这部电影，它非常令人愉快。\n事实上，我在撒谎。看这部电影简直是种折磨，我讨厌它。", sentiment: "Negative" },
    { text: "这是一部伟大的电影。情节非常有趣，演技也极其精湛。\n我绝对会把它推荐给任何喜欢优秀悬疑片的人。", sentiment: "Positive" },
    { text: "这部电影简直是一场灾难。剧本写得很烂，演技更是糟糕。\n我不敢相信竟然有人觉得这是一个好主意。", sentiment: "Negative" },
    { text: "一个关于小女孩和她的狗的非常感人的故事。\n这真是一个催泪弹，所以请务必准备好纸巾。", sentiment: "Positive" },
    { text: "特效假得可笑，情节也到处都是漏洞。\n感觉就像是一个五岁小孩写出来的东西。", sentiment: "Negative" },
    { text: "这是我很长一段时间以来看过的最好的电影之一。\n摄影非常漂亮，音乐也有一种忧伤的美感。", sentiment: "Positive" },
    { text: "我对这部电影感到非常失望。我本来对导演抱有更高的期待。\n它只是一部毫无内涵的平庸动作片。", sentiment: "Negative" },
    { text: "一部非常幽默迷人的电影，会让你带着微笑离开影院。\n女主角的表现绝对是出类拔萃的。", sentiment: "Positive" },
    { text: "节奏慢得令人难以置信，我发现自己很快就感到厌烦了。\n整部电影完全没有任何张力或兴奋点。", sentiment: "Negative" },
    { text: "一部震撼人心且感人至深的电影，探讨了一些非常重要的主题。\n对于任何关心社会正义的人来说，这都是必看之作。", sentiment: "Positive" },
    { text: "结局完全令人失望，根本没有任何逻辑可言。\n感觉就像他们写到一半就放弃了，直接停止了创作。", sentiment: "Negative" }
  ],
  Medium: [
    { text: "在这个价位上音质相当不错，佩戴起来也很舒服。\n我每天通勤时都戴着它，它能隔绝大部分背景噪音。\n总的来说，这是一副扎实的耳机，我会推荐给其他人。", sentiment: "Positive" },
    { text: "产品按时送达，但包装破损，感觉像是被使用过。 \n使用起来还可以，但电池续航远没有描述中宣传的那么好。\n我留着它是因我现在急需，但我对这次购物并不完全满意。", sentiment: "Negative" },
    { text: "这款咖啡机非常易于使用，每次都能做出一杯很棒的咖啡。\n设计很时尚，完美契合我狭小的厨房台面，不占空间。\n物超所值，我对这次购买感到非常满意。", sentiment: "Positive" },
    { text: "衬衫的材质很柔软，但尺码非常不一致，穿起来很奇怪。\n我按平时的尺码买的，结果有的地方紧有的地方松，很烦人。\n在家里穿穿还可以，但我绝对不会穿它出门。", sentiment: "Negative" },
    { text: "吸尘器吸力很强，能非常有效地清理地毯上的宠物毛发。\n提着它上楼有点沉，但出色的性能弥补了重量上的不足。\n我已经用了一个月了，它的表现依然和第一天一样出色。", sentiment: "Positive" },
    { text: "组装说明书有点模糊，花了我比预期更长的时间才装好。\n成品还算稳固，但组装时有些零件并没有完美对齐。\n以这个价格来说算是不错的桌子，但别指望它有高端品质。", sentiment: "Negative" },
    { text: "相机拍出的照片非常清晰，视频质量对于紧凑型设备来说也很好。\n菜单导航非常简单，电池电量足够支撑一整天的观光和拍照。\n如果你不想携带沉重的专业相机，它就是旅行的完美选择。", sentiment: "Positive" },
    { text: "外壳很贴合手机，但颜色和图片上显示的差别很大。\n拿在手里也感觉有点滑，这让我很担心手机会掉在地上。\n它提供了基本的保护，但我以后可能会找一个抓握感更好的。", sentiment: "Negative" },
    { text: "搅拌机动力强劲，做出的蛋白奶昔很顺滑，没有结块或碎冰。\n与我的旧机器相比它相对安静，使用后的清理工作也很快捷。\n我每天早上都用它，它是我健康生活方式的一个极佳补充。", sentiment: "Positive" },
    { text: "鞋子款式很时尚，看起来很棒，但缓冲很少，走久了脚疼。\n我不得不额外买了一副鞋垫，才能让它适合在办公室穿一整天。\n价格还可以，但我本来期待它穿起来能更舒服一些。", sentiment: "Negative" },
    { text: "键盘的手感很好，背光按键对于在弱光环境下工作非常有帮助。\n它做工精良，感觉即使在办公室每天高强度使用也能用很久。\n对于寻找可靠舒适打字体验的人来说，这是一个不错的中端选择。", sentiment: "Positive" },
    { text: "屏幕保护膜安装起来有点困难，最后还是留下了一些小气泡。\n它不能完美覆盖整个屏幕，显示屏边缘留下了一道小缝隙。\n它提供了一定的保护，但制造商确实应该改进安装过程。", sentiment: "Negative" },
    { text: "烤面包机表现很好，面包两面都能均匀上色，不会烧焦边缘。\n它有一个很宽的插槽可以烤贝果，碎屑盘也很容易拆卸和清理。\n简单、有效，放在厨房里也很好看——正是我想要的。", sentiment: "Positive" },
    { text: "地毯很柔软，颜色也很鲜艳，但即使吸了几次尘还是掉毛严重。\n我希望掉毛现象能尽快停止，但目前来说，清理起来有点麻烦。\n这是一块漂亮的地毯，但维护成本比我购买时预想的要高。", sentiment: "Negative" },
    { text: "移动电源很小巧，当我远离墙插时能快速为我的手机充电。\n它的电量足够支撑大约两次完整充电，非常适合长途旅行。\n价格有点贵，但出色的做工和可靠性让这笔额外支出物有所值。", sentiment: "Positive" },
    { text: "灯泡很亮，色温也很舒服，但其中一个只用了一个月就坏了。\n考虑到价格和品牌的声誉，我本来期待它们能用得更久一些。\n工作时表现还可以，但耐用性是我今后比较担心的问题。", sentiment: "Negative" },
    { text: "背包有很多隔层，可以整齐地收纳我的电脑、书籍和其他必需品。\n长时间背负也很舒服，防水材质是一个非常实用的额外功能。\n非常适合学生或任何需要在日常通勤中携带大量物品的人。", sentiment: "Positive" },
    { text: "手表看起来很棒，步数追踪也很准，但睡眠监测功能很鸡肋。\n有时它能完美记录我的睡眠，有时又会漏掉好几个小时的数据。\n它是一个合格的基础追踪器，但不要指望它能提供详细的健康数据。", sentiment: "Negative" },
    { text: "锅是真的不粘，煎鸡蛋和煎饼非常容易，完全不会粘在锅底。\n用抹布轻轻一擦就干净了，而且锅面的热量分布似乎也非常均匀。\n这是我厨具收藏中的一个好帮手，我对目前的表现非常满意。", sentiment: "Positive" },
    { text: "窗帘遮光效果很好，但面料摸起来感觉有点薄，质感比较廉价。\n刚打开包装时还有一股强烈的化学味，过了好几天才慢慢散去。\n它们能完成任务，但我本来期待在这个价位能买到更好的材质。", sentiment: "Negative" }
  ],
  Complex: [
    { text: "这是一次大胆的叙事尝试，导演试图在废土背景下探讨存在的意义。\n虽然中间部分的哲学思辨略显晦涩，可能会让普通观众感到困惑，\n但那种宏大的孤独感和对希望的执着追求，确实触动了灵魂深处。\n如果你愿意沉下心来，这绝对是一场不可多得的视听与思想盛宴。", sentiment: "Positive" },
    { text: "电影的前半段营造了极佳的悬疑氛围，每一个伏笔都让人充满期待。\n然而到了揭晓真相的时刻，导演却选择了一个最平庸、最经不起推敲的解释。\n这种虎头蛇尾的处理方式，不仅浪费了演员们精彩的铺垫，也让观众感到被愚弄。\n可惜了一部本可以成为经典的佳作，最终只能沦为平庸之辈。", sentiment: "Negative" },
    { text: "导演以一种近乎残酷的真实感，剥开了中产阶级生活那层温情的面纱。\n电影中没有绝对的好人或坏人，只有在欲望和道德之间苦苦挣扎的普通人。\n这种对人性的深度挖掘让人感到压抑，但也正是其力量所在，让人无法回避。\n这是一部具有极强社会批判性的作品，它像手术刀一样精准地切中了时代的病灶。", sentiment: "Positive" },
    { text: "虽然电影拥有极其华丽的视觉特效和宏大的战争场面，但它缺乏一个核心灵魂。\n所有的冲突都显得非常刻意，角色的情感转变也缺乏足够的逻辑支撑，显得生硬。\n观众在观影过程中更像是在看一场昂贵的烟花秀，而非在经历一段动人的旅程。\n这种缺乏人文关怀的技术堆砌，最终只能在观众的记忆中留下一片空白。", sentiment: "Negative" },
    { text: "这是一部关于记忆与遗忘的迷宫式电影，非线性的叙事结构极具挑战性。\n导演巧妙地利用色彩和声音的暗示，引导观众在现实与梦境之间穿梭往返。\n虽然观影门槛较高，但当你最终拼凑出真相的那一刻，那种智力上的快感是无与伦比的。\n它不仅仅是一部电影，更是一次关于意识边界的深刻探索。", sentiment: "Positive" },
    { text: "电影试图通过多线叙事来展现城市的众生相，但导演的掌控力显然不足以驾驭。\n各个故事线之间的关联显得非常牵强，人物性格的扁平化也让故事缺乏感染力。\n这种野心太大却力不从心的做法，导致电影最终变成了一盘散沙，毫无重点。\n看完之后，你很难记住任何一个角色，也很难理解导演到底想要传达什么。", sentiment: "Negative" },
    { text: "这是一场充满诗意的视觉流浪，导演用极简的对白构建了一个极具张力的情感世界。\n每一个静止的镜头都仿佛蕴含着千言万语，让观众在沉默中感受到角色内心的波澜。\n这种对电影语言的纯粹运用，展现了导演极高的艺术造诣和对人性的深刻洞察。\n它证明了伟大的作品不需要喧嚣的特效，只需要一颗真诚的心和敏锐的观察力。", sentiment: "Positive" },
    { text: "电影的讽刺意味非常浓厚，它通过荒诞的情节对当下的消费主义进行了辛辣的嘲讽。\n然而，导演在处理这种讽刺时显得有些用力过猛，导致角色变成了纯粹的讽刺工具。\n这种缺乏温度的创作方式让电影显得非常刻薄，很难引起观众真正的共鸣和反思。\n它更像是一场自嗨式的批判，而非一次有意义的社会对话。", sentiment: "Negative" },
    { text: "这是一部关于女性自我觉醒的史诗，导演以一种温柔而坚定的力量展现了角色的成长。\n它没有落入性别对立的俗套，而是从更广阔的人性视角出发，探讨了自由与尊严。\n主演的表演极具爆发力，将角色从压抑到释放的过程演绎得淋漓尽致，令人动容。\n这不仅是一部优秀的女性题材电影，更是一部关于人类追求自我价值的普遍赞歌。", sentiment: "Positive" },
    { text: "电影的节奏拖沓到了令人发指的地步，大量的空镜头和无意义的对话充斥其中。\n导演似乎把这种“慢”等同于“艺术感”，却忽略了电影最基本的叙事效率和观影体验。\n这种对观众耐心的极度消耗，最终只能换来满场的呵欠和中途离场的背影。\n如果艺术意味着要让观众感到痛苦和无聊，那这种艺术不要也罢。", sentiment: "Negative" },
    { text: "这是一部极具先锋精神的实验电影，它打破了传统叙事的桎梏，创造了全新的视听体验。\n虽然这种风格可能会让习惯了传统商业片的观众感到不适，但其创新性是不容置疑的。\n它挑战了我们对电影的固有认知，为这个古老的媒介注入了新鲜的血液和无限的可能。\n对于那些渴望看到不一样东西的观众来说，这绝对是一次惊喜不断的冒险。", sentiment: "Positive" },
    { text: "电影的剧本充满了各种陈词滥调和逻辑硬伤，让人怀疑编剧是否还在上个世纪。\n所有的反转都在意料之中，所有的冲突都显得那么廉价和刻意，毫无新鲜感可言。\n导演试图用快节奏的剪辑来掩盖内容的贫瘠，但这只会让电影看起来更加浮躁和虚假。\n这种缺乏诚意的平庸之作，除了浪费资源之外没有任何价值。", sentiment: "Negative" },
    { text: "这是一部关于孤独与连接的动人小品，导演以一种极其细腻的笔触捕捉到了现代人的心理困境。\n电影中那些细微的情感波动和不经意的动作，都充满了让人心碎的力量和真实的质感。\n它没有宏大的叙事，却在平凡的生活中挖掘出了不平凡的意义，让人在看完之后感到温暖。\n这是一部能治愈心灵的佳作，它提醒我们要珍惜身边那些微小而确定的幸福。", sentiment: "Positive" },
    { text: "电影的基调非常压抑，它真实地展现了贫困和绝望是如何摧毁一个人的意志。\n导演没有进行任何美化，而是用一种近乎残酷的真实感将这些社会问题摆在观众面前。\n这种直面苦难的勇气令人敬佩，它唤起了人们对弱势群体的关注和同情。\n虽然观影过程并不愉快，但这种沉重感正是电影想要传达的力量，不容忽视。", sentiment: "Negative" },
    { text: "这是一场关于声音与画面的完美协奏，导演展现了对视听语言极高的掌控力。\n配乐不仅仅是背景，它与画面、剪辑、表演有机地结合在一起，共同推动着情感的爆发。\n这种全方位的感官体验让人仿佛置身于电影的世界之中，与角色同呼吸、共命运。\n它是对电影艺术魅力的一次完美诠释，展现了这种媒介所能达到的最高境界。", sentiment: "Positive" },
    { text: "电影的特效虽然华丽，但却缺乏想象力，看起来像是各种经典科幻片的缝合怪。\n这种缺乏原创性的设计让观众感到审美疲劳，很难对电影中的世界产生真正的兴趣。\n导演似乎认为只要堆砌足够多的视觉元素就能成功，却忽略了故事才是电影的灵魂。\n这种缺乏诚意的商业运作，最终只能产出一件毫无个性的工业流水线产品。", sentiment: "Negative" },
    { text: "这是一个关于秘密与背叛的故事，其错综复杂的人物关系让人看得目不暇接。\n导演通过精妙的剪辑和叙事结构，将真相隐藏在重重迷雾之后，直到最后一刻才揭晓。\n演员们的表演非常有层次感，每个人似乎都戴着面具，让人真假难辨。\n这是一部非常烧脑的悬疑佳作，它挑战了观众的逻辑思维能力，让人大呼过瘾。", sentiment: "Positive" },
    { text: "电影的幽默感非常高级，它通过冷幽默和讽刺对社会现状进行了辛辣的批判。\n剧本的对白充满了智慧，每一个笑点背后都隐藏着对现实的深刻观察和无奈。\n这种黑色幽默的风格虽然有一定的门槛，但对于喜欢思考的观众来说是极大的享受。\n它不只是一部让人发笑的喜剧，更是一面照向现实的镜子，让人在笑声中反思。", sentiment: "Positive" },
    { text: "电影的配乐非常出彩，它不仅仅是背景音乐，更是电影叙事的重要组成部分。\n旋律在关键时刻能够极大地增强情感的表达，让观众的情绪随之起伏波动。\n这种音画合一的艺术境界，展现了导演和作曲家之间极高的默契和才华。\n即便脱离了画面，这些音乐依然具有独立的艺术价值，是一场听觉的盛宴。", sentiment: "Positive" },
    { text: "这是一个关于梦想与现实冲突的永恒主题，导演以一种全新的视角进行了诠释。\n它没有落入成功学的窠臼，而是真实地展现了追求梦想过程中的艰辛、孤独与妥协。\n这种对现实的清醒认识让电影更具说服力，也更能引起那些正在奋斗的人们的共鸣。\n这是一部写给所有追梦人的情书，它告诉我们：过程本身往往比结果更有意义。", sentiment: "Positive" }
  ]
};

type View = 'Difficulty' | 'Task';

export default function App() {
  const [view, setView] = useState<View>('Difficulty');
  const [difficulty, setDifficulty] = useState<Difficulty | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showFeedback, setShowFeedback] = useState<'correct' | 'incorrect' | null>(null);
  const [isFinished, setIsFinished] = useState(false);

  const currentReviews = difficulty ? REVIEWS[difficulty] : [];
  const currentReview = currentReviews[currentIndex];
  const totalTasks = currentReviews.length;

  const handleChoice = (choice: string) => {
    if (showFeedback || !currentReview) return;

    const isCorrect = choice === currentReview.sentiment;
    if (isCorrect) {
      setScore(s => s + 1);
      setShowFeedback('correct');
    } else {
      setShowFeedback('incorrect');
    }

    setTimeout(() => {
      setShowFeedback(null);
      if (currentIndex < totalTasks - 1) {
        setCurrentIndex(prev => prev + 1);
      } else {
        setIsFinished(true);
      }
    }, 1500);
  };

  const skipTask = () => {
    if (currentIndex < totalTasks - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      setIsFinished(true);
    }
  };

  const startTask = (diff: Difficulty) => {
    setDifficulty(diff);
    setCurrentIndex(0);
    setScore(0);
    setIsFinished(false);
    setView('Task');
  };

  const reset = () => {
    setView('Difficulty');
    setDifficulty(null);
    setCurrentIndex(0);
    setScore(0);
    setIsFinished(false);
    setShowFeedback(null);
  };

  const goBack = () => {
    if (view === 'Task') setView('Difficulty');
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-[#E5E5E5] font-sans flex flex-col overflow-hidden">
      {/* Status Bar Mockup */}
      <div className="px-6 pt-4 pb-2 flex justify-between items-center text-xs opacity-60">
        <span>16:13</span>
        <div className="flex gap-1 items-center">
          <div className="w-4 h-2 bg-white/40 rounded-sm" />
          <span>5G</span>
          <span>32</span>
        </div>
      </div>

      {/* Header */}
      <header className="px-4 py-3 flex items-center justify-between border-b border-white/5">
        <div className="flex items-center gap-3">
          <button onClick={goBack} className={`p-1 -ml-1 active:opacity-50 transition-opacity ${view === 'Difficulty' ? 'opacity-0 pointer-events-none' : ''}`}>
            <ChevronLeft className="w-6 h-6" />
          </button>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-[#3B82F6] rounded-lg flex items-center justify-center">
              <LayoutGrid className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-lg font-medium">数据贡献中心</h1>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto px-4 py-6 space-y-6">
        <AnimatePresence mode="wait">
          {view === 'Difficulty' && (
            <motion.div 
              key="difficulty"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              {/* Chat History */}
              <div className="flex flex-col gap-6">
                <div className="flex flex-col items-end">
                  <div className="bg-[#2C2C2E] text-white px-8 py-3 rounded-full text-sm font-medium border border-white/5 opacity-50">
                    文本
                  </div>
                </div>
                
                <div className="flex gap-3 items-start">
                  <div className="w-8 h-8 bg-[#3B82F6] rounded-lg flex-shrink-0 flex items-center justify-center">
                    <LayoutGrid className="w-5 h-5 text-white" />
                  </div>
                  <div className="bg-[#1C1C1E] rounded-2xl p-4 max-w-[85%] shadow-xl">
                    <p className="text-[15px] leading-relaxed">请选择难度等级。</p>
                  </div>
                </div>
              </div>

              {/* Difficulty Options */}
              <div className="flex flex-col gap-3 pt-4">
                <button 
                  onClick={() => startTask('Easy')}
                  className="w-full bg-[#1C1C1E] text-white py-4 rounded-2xl font-medium border border-white/5 active:bg-[#2C2C2E] transition-colors"
                >
                  简单
                </button>
                <button 
                  onClick={() => startTask('Medium')}
                  className="w-full bg-[#1C1C1E] text-white py-4 rounded-2xl font-medium border border-white/5 active:bg-[#2C2C2E] transition-colors"
                >
                  中等
                </button>
                <button 
                  onClick={() => startTask('Complex')}
                  className="w-full bg-[#1C1C1E] text-white py-4 rounded-2xl font-medium border border-white/5 active:bg-[#2C2C2E] transition-colors"
                >
                  复杂
                </button>
                <button 
                  className="w-full bg-[#1C1C1E] text-white py-4 rounded-2xl font-medium border border-white/5 active:bg-[#2C2C2E] transition-colors opacity-60"
                >
                  返回上一级
                </button>
              </div>
            </motion.div>
          )}

          {view === 'Task' && (
            <motion.div
              key="task"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              {!isFinished ? (
                <div className="bg-[#1C1C1E] rounded-3xl p-6 border border-white/5 shadow-2xl relative overflow-hidden">
                  {/* Progress */}
                  <div className="flex justify-between items-center mb-6">
                    <div className="flex items-center gap-2">
                      <span className="text-xs opacity-40 uppercase tracking-wider font-medium">
                        任务进度 {currentIndex + 1}/{totalTasks}
                      </span>
                      <span className="text-[10px] px-2 py-0.5 bg-brand/20 text-brand rounded-full font-bold">
                        {difficulty === 'Easy' ? '简单' : difficulty === 'Medium' ? '中等' : '复杂'}
                      </span>
                    </div>
                    <button onClick={() => setView('Difficulty')}>
                      <X className="w-5 h-5 opacity-40" />
                    </button>
                  </div>

                  <h2 className="text-lg font-medium mb-6 text-center">
                    请判断该句表达的情绪（需选一个）。
                  </h2>

                  {/* Review Text Area */}
                  <div className="bg-[#2C2C2E] rounded-2xl p-6 mb-8 min-h-[140px] flex items-center justify-center text-center">
                    <p className="text-[17px] leading-relaxed italic text-white/90 whitespace-pre-line">
                      "{currentReview?.text}"
                    </p>
                  </div>

                  {/* Action Buttons */}
                  <div className="grid grid-cols-2 gap-3 mb-6">
                    <button
                      onClick={() => handleChoice('Positive')}
                      disabled={!!showFeedback}
                      className={`flex flex-col items-center justify-center gap-2 py-5 rounded-2xl transition-all active:scale-95 ${
                        showFeedback === 'correct' && currentReview?.sentiment === 'Positive'
                          ? 'bg-emerald-500/20 border-emerald-500/50 text-emerald-400'
                          : showFeedback === 'incorrect' && currentReview?.sentiment !== 'Positive'
                          ? 'bg-rose-500/10 border-rose-500/30 opacity-50'
                          : 'bg-[#2C2C2E] border border-white/5 hover:bg-[#3A3A3C]'
                      }`}
                    >
                      <ThumbsUp className="w-6 h-6" />
                      <span className="text-sm font-medium">正面</span>
                    </button>
                    <button
                      onClick={() => handleChoice('Negative')}
                      disabled={!!showFeedback}
                      className={`flex flex-col items-center justify-center gap-2 py-5 rounded-2xl transition-all active:scale-95 ${
                        showFeedback === 'correct' && currentReview?.sentiment === 'Negative'
                          ? 'bg-emerald-500/20 border-emerald-500/50 text-emerald-400'
                          : showFeedback === 'incorrect' && currentReview?.sentiment !== 'Negative'
                          ? 'bg-rose-500/10 border-rose-500/30 opacity-50'
                          : 'bg-[#2C2C2E] border border-white/5 hover:bg-[#3A3A3C]'
                      }`}
                    >
                      <ThumbsDown className="w-6 h-6" />
                      <span className="text-sm font-medium">负面</span>
                    </button>
                  </div>

                  {/* Skip Link */}
                  <div className="text-center">
                    <button 
                      onClick={skipTask}
                      className="text-sm text-[#3B82F6] hover:underline opacity-80"
                    >
                      跳过此项任务
                    </button>
                  </div>

                  {/* Feedback Overlay */}
                  <AnimatePresence>
                    {showFeedback && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 flex items-center justify-center bg-[#1C1C1E]/80 backdrop-blur-sm z-10"
                      >
                        <div className="flex flex-col items-center gap-3">
                          {showFeedback === 'correct' ? (
                            <>
                              <CheckCircle2 className="w-16 h-16 text-emerald-500" />
                              <span className="text-xl font-bold text-emerald-500">判断正确</span>
                            </>
                          ) : (
                            <>
                              <AlertCircle className="w-16 h-16 text-rose-500" />
                              <span className="text-xl font-bold text-rose-500">判断错误</span>
                            </>
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-[#1C1C1E] rounded-3xl p-8 border border-white/5 shadow-2xl text-center"
                >
                  <div className="w-20 h-20 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle2 className="w-10 h-10 text-emerald-500" />
                  </div>
                  <h2 className="text-2xl font-bold mb-2">任务完成!</h2>
                  <p className="opacity-60 mb-8">
                    您已完成 <span className="text-brand font-bold">{difficulty === 'Easy' ? '简单' : difficulty === 'Medium' ? '中等' : '复杂'}</span> 难度的任务。
                    <br />
                    正确率: <span className="text-white font-bold">{Math.round((score / totalTasks) * 100)}%</span>
                  </p>
                  
                  <div className="space-y-3">
                    <button
                      onClick={() => startTask(difficulty!)}
                      className="w-full bg-[#3B82F6] text-white py-4 rounded-2xl font-bold active:scale-95 transition-transform"
                    >
                      重新开始
                    </button>
                    <button 
                      onClick={reset}
                      className="w-full bg-[#2C2C2E] text-white py-4 rounded-2xl font-bold opacity-60"
                    >
                      返回中心
                    </button>
                  </div>
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        <p className="text-[11px] text-center opacity-30 mt-4">
          所有上传内容均需人工AI双重审核。
        </p>
      </main>

      {/* Bottom Input Area Mockup */}
      <div className="px-4 py-4 border-t border-white/5 bg-[#0A0A0A]">
        <div className="bg-[#1C1C1E] rounded-full px-5 py-3 flex items-center gap-3 shadow-lg">
          <MessageSquare className="w-5 h-5 opacity-40" />
          <input 
            type="text" 
            placeholder="有什么可以帮你？" 
            className="flex-1 bg-transparent border-none outline-none text-sm placeholder:opacity-40"
            disabled
          />
          <div className="flex items-center gap-3">
            <MoreHorizontal className="w-5 h-5 opacity-40" />
            <div className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center">
              <Send className="w-4 h-4 opacity-40" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
