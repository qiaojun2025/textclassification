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
    { text: "电影非常精彩，演员演技在线。\n强烈推荐大家去电影院观看。", sentiment: "Positive" },
    { text: "剧情平淡无奇，看了半小时就想走。\n完全不推荐。", sentiment: "Negative" },
    { text: "视觉效果震撼，音乐也很好听。\n是一部值得二刷的佳作。", sentiment: "Positive" },
    { text: "剧本写得很烂，对白也非常尴尬。\n简直是在侮辱观众的智商。", sentiment: "Negative" },
    { text: "这是一个温馨的故事，看完之后心情很好。\n适合全家人一起看。", sentiment: "Positive" },
    { text: "动作戏很精彩，但文戏实在太弱了。\n看完之后没有任何记忆点。", sentiment: "Negative" },
    { text: "导演的风格很独特，画面构图非常讲究。\n是一部很有诚意的作品。", sentiment: "Positive" },
    { text: "恐怖氛围营造得很失败，一点都不吓人。\n感觉是在看滑稽戏。", sentiment: "Negative" },
    { text: "结局的反转出人意料，非常惊喜。\n很久没看到这么好的悬疑片了。", sentiment: "Positive" },
    { text: "节奏拖沓，剪辑混乱，让人看得昏昏欲睡。\n完全是浪费生命。", sentiment: "Negative" },
    { text: "演员之间的化学反应很棒，爱情戏很动人。\n是一部很成功的浪漫片。", sentiment: "Positive" },
    { text: "角色设定太苍白，没有任何深度。\n感觉只是在走过场，没有灵魂。", sentiment: "Negative" },
    { text: "幽默感十足，全场笑声不断。\n是近期看过最轻松愉快的喜剧。", sentiment: "Positive" },
    { text: "逻辑漏洞百出，强行煽情非常尴尬。\n这种电影居然也能上映。", sentiment: "Negative" },
    { text: "摄影非常美，每一帧都可以当壁纸。\n虽然剧情一般，但画面满分。", sentiment: "Positive" },
    { text: "翻拍得很失败，完全没有原作的神韵。\n建议大家还是去看原版。", sentiment: "Negative" },
    { text: "很有教育意义，发人深省。\n是一部能引起社会广泛讨论的好片。", sentiment: "Positive" },
    { text: "演技浮夸，台词生硬，让人尴尬得脚趾抠地。\n真的看不下去。", sentiment: "Negative" },
    { text: "动画制作精良，配音也非常专业。\n大人小孩都会喜欢的作品。", sentiment: "Positive" },
    { text: "宣传过度，实际内容名不副实。\n看完之后感觉被骗了，很失望。", sentiment: "Negative" }
  ],
  Medium: [
    { text: "演员的表现非常出色，但是剧情在下半部分显得有些仓促。\n总的来说，这是一部适合周末观看的不错电影。\n虽然有一些小瑕疵，但整体瑕不掩瑜，值得一看。", sentiment: "Positive" },
    { text: "我对这位导演抱有很高的期望，但这次的表现让人失望。\n视觉效果虽然很棒，但故事内容空洞，大部分时间都很无聊。\n这种华而不实的作品，真的很难让人产生共鸣。", sentiment: "Negative" },
    { text: "男主角的精彩表演拯救了这个平庸的剧本，让电影有了看点。\n如果你是他的粉丝，那么这部电影绝对不容错过。\n结局的处理也非常巧妙，给人留下了深刻的印象。", sentiment: "Positive" },
    { text: "剧情漏洞太多，不必要的角色也加了一堆，显得非常臃肿。\n它试图探讨深刻的主题，但最终只落得个混乱和挫败的下场。\n看完之后感觉非常疲惫，完全没有得到应有的娱乐。", sentiment: "Negative" },
    { text: "两位主演之间的火花四溅，让这段本该平淡的恋情变得充满活力。\n导演对细节的把控非常到位，让观众能够完全沉浸在故事中。\n这是一部近期难得一见的优秀爱情电影，强烈推荐。", sentiment: "Positive" },
    { text: "虽然动作场面设计得非常精彩，但角色的缺失让人很难产生代入感。\n你不在乎他们的生死，因为他们看起来就像是冷冰冰的符号。\n这种纯粹追求感官刺激的电影，看完之后很快就会被遗忘。", sentiment: "Negative" },
    { text: "这是一个出人意料的感人故事，成功避开了大多数同类电影的陈词滥调。\n它以一种细腻的方式探讨了家庭和责任，让人在欢笑中流下泪水。\n绝对是今年的一颗“沧海遗珠”，建议大家静下心来欣赏。", sentiment: "Positive" },
    { text: "电影的对白极其幼稚，特效在今天看来也显得非常过时和廉价。\n很难想象这是在大制作背景下产出的作品，感觉非常敷衍。\n如果你不想浪费两个小时，最好还是避开这部电影。", sentiment: "Negative" },
    { text: "开头虽然有些缓慢，但随着剧情的推进，高潮部分非常震撼人心。\n它会让你在看完之后思考好几天，这种后劲是非常难得的。\n绝对值得等待，是一部需要耐心品味的艺术佳作。", sentiment: "Positive" },
    { text: "电影的节奏非常混乱，在喜剧和悲剧之间的转换显得生硬且无效。\n观众不知道该笑还是该哭，这种尴尬的氛围贯穿了始终。\n导演似乎迷失了方向，没能把各种元素有机地结合在一起。", sentiment: "Negative" },
    { text: "剧本的构思非常巧妙，层层递进的悬念让人欲罢不能。\n演员们的集体发挥也非常稳定，共同塑造了一个真实的世界。\n这是一部智商在线的佳作，喜欢推理的朋友一定会喜欢。", sentiment: "Positive" },
    { text: "电影的主题非常宏大，但导演的能力显然无法驾驭这么复杂的叙事。\n很多线索交代不清，导致结局显得非常突兀且缺乏说服力。\n这种野心太大却力不从心的作品，往往最让人感到遗憾。", sentiment: "Negative" },
    { text: "音乐和画面的配合达到了完美的境地，营造出一种梦幻般的氛围。\n虽然剧情相对简单，但这种沉浸式的体验是非常独特的。\n它更像是一首流动的诗，带给观众无尽的审美享受。", sentiment: "Positive" },
    { text: "电影充斥着大量的暴力镜头，却没有任何实质性的内涵支撑。\n这种为了暴力而暴力的做法，只会让人感到不适和反感。\n它缺乏对生命的敬畏，是一部价值观非常有问题的作品。", sentiment: "Negative" },
    { text: "这是一个关于自我救赎的经典故事，虽然老套但依然充满力量。\n演员的眼神里全是戏，将角色的内心挣扎表现得淋漓尽致。\n看完之后会给人带来希望，是一部非常温暖的励志电影。", sentiment: "Positive" },
    { text: "电影的剪辑简直是一场灾难，场景之间的跳跃让人摸不着头脑。\n很多关键情节被删减得支离破碎，严重影响了观影的连贯性。\n这种不负责任的后期制作，毁掉了一部本该不错的电影。", sentiment: "Negative" },
    { text: "导演对社会现实的观察非常敏锐，台词犀利且富有哲理。\n它揭露了人性中阴暗的一面，同时也保留了一丝对美好的向往。\n这是一部有深度、有厚度的作品，值得每一个成年人深思。", sentiment: "Positive" },
    { text: "电影的色彩运用非常大胆，给人带来了强烈的视觉冲击力。\n这种先锋派的艺术风格虽然小众，但确实展现了导演的才华。\n如果你喜欢尝试新鲜事物，这部电影一定会让你耳目一新。", sentiment: "Positive" },
    { text: "剧情的转折非常生硬，完全是为了反转而反转，缺乏逻辑支撑。\n这种把观众当傻子的做法，只会降低电影的整体格调。\n看完之后感觉智商受到了侮辱，非常不推荐大家观看。", sentiment: "Negative" },
    { text: "这是一部诚意满满的纪录片，记录了那些被遗忘的角落和人群。\n它真实、质朴，没有过多的修饰，却能直抵人心最柔软的地方。\n感谢导演的坚持，让我们看到了这个世界不为人知的另一面。", sentiment: "Positive" }
  ],
  Complex: [
    { text: "这是一部对人性进行深刻探讨的杰作，背景设定在宏大的宇宙之中。\n虽然有些人可能会觉得节奏较慢，但这种刻意的叙事方式让角色得到了充分的发展。\n这种深度在现代商业大片中已经很少见了，结局更是让人在走出影院后依然深思。\n每一个镜头都像是一幅精美的画作，配乐也极其动人，完美契合了电影的基调。", sentiment: "Positive" },
    { text: "尽管拥有高昂的制作成本和全明星阵容，这部电影却未能兑现其令人期待的承诺。\n台词往往显得生硬尴尬，次要角色的动机也从未得到充分解释，导致剧情走向混乱。\n最终的结局令人感到困惑且不满意，因为它与之前的任何铺垫都没有建立起有效的联系。\n这种空有其表而缺乏灵魂的作品，无疑是今年电影市场上最大的失望之一。", sentiment: "Negative" },
    { text: "电影如同一幅交织着情感与视觉盛宴的精致挂毯，展现了导演非凡的调度能力。\n导演成功地在多个复杂的故事线之间取得了平衡，使叙事既流畅又富有层次感。\n结局的处理既在情感上引起了共鸣，又在智力上给人以启发，是一次完美的收官。\n这是一部罕见的需要多次观看才能完全领略其深度的电影，每一遍都会有新的发现。", sentiment: "Positive" },
    { text: "电影试图探讨复杂的哲学主题，但最终却陷入了自我沉溺和故作高深的泥潭中。\n非线性的结构更像是一种掩盖剧情单薄的噱头，而非叙事上的必然选择，让人疲惫。\n观众在观影过程中很难建立起情感连接，只感觉到导演在不断地进行说教。\n当片尾字幕亮起时，人们感到的更多是解脱而非启迪，这种艺术尝试显然是失败的。", sentiment: "Negative" },
    { text: "这是一项令人叹为观止的电影成就，它在技术和叙事上都推向了媒介的边界。\n实景特效与电脑动画的无缝结合，创造了一个既陌生又让人感到真实可信的异世界。\n它是对远见卓识的叙事能力和精益求精的工匠精神的最好证明，令人肃然起敬。\n每一个细节都经得起推敲，每一场戏都充满了张力，是当之无愧的年度最佳影片。", sentiment: "Positive" },
    { text: "虽然摄影技术无疑是顶尖的，但它无法弥补剧本在情感上的疏离感和内容的陈旧。\n角色们更像是为了完成任务而存在的原型，而非具有复杂情感和独立人格的真实个体。\n他们的挣扎无法引起观众的任何共鸣，导致整个观影过程显得冰冷、机械且乏味。\n这种缺乏人文关怀的技术堆砌，最终只能沦为一场华丽却空洞的视觉秀。", sentiment: "Negative" },
    { text: "电影是悬疑感与心理深度结合的典范，导演对氛围的掌控达到了炉火纯青的地步。\n他巧妙地利用阴影和寂静来营造一种挥之不去的恐惧感，这种感觉在影院外依然存在。\n主演的表演具有毁灭性的力量，精准地捕捉到了角色在绝望中逐渐崩溃的心理过程。\n这是一部挑战观众心理极限的作品，它证明了优秀的恐怖片不需要依赖廉价的惊吓。", sentiment: "Positive" },
    { text: "这部电影正经历着严重的身份危机，它在硬核政治惊悚片与动作大片之间摇摆不定。\n这种犹豫不决导致了叙事的断裂，使得电影在两个领域都没能达到应有的高度。\n观众会感到一种明显的错位感，仿佛在同时观看两部风格迥异且互不兼容的电影。\n这种由于定位不明而导致的潜力浪费，对于参与其中的优秀演员来说实在是一种遗憾。", sentiment: "Negative" },
    { text: "这是一场充满活力、色彩斑斓且极具感染力的文化庆典，让人感受到了生命的喜悦。\n电影的配乐极具动感，演员们的表演充满了真挚的热情，让人忍不住想要随之起舞。\n它成功地将个人化的叙事与普世的情感结合在一起，具有跨越文化边界的魅力。\n在这个充满焦虑的时代，这样一部能让人开怀大笑并重拾信心的电影显得尤为珍贵。", sentiment: "Positive" },
    { text: "剧情过度依赖于各种巧合和不合逻辑的角色选择，这严重削弱了故事的真实感。\n到了第三幕，叙事逻辑已经完全崩塌，导致结局显得极其牵强，甚至有些荒唐。\n这种为了推进剧情而牺牲人物逻辑的做法，毁掉了电影前半部分积累的所有好感。\n看完之后，观众会感到被愚弄了，这种对叙事严谨性的忽视是不可原谅的。", sentiment: "Negative" },
    { text: "电影以一种极其细腻的笔触，描绘了现代都市人内心深处的孤独与渴望。\n导演没有使用激烈的冲突，而是通过日常生活的点滴来展现角色微妙的情感变化。\n这种极简主义的风格反而产生了更强大的力量，让每一个观众都能在其中看到自己。\n这是一部安静却有力的电影，它提醒我们要关注那些被忙碌生活所掩盖的内心声音。", sentiment: "Positive" },
    { text: "电影的剪辑节奏快得让人窒息，这种风格虽然在开始时很新鲜，但很快就让人疲劳。\n过多的快速切镜和晃动的镜头让观众很难看清动作细节，甚至会产生生理上的不适。\n导演似乎在追求一种极致的视觉刺激，却忽略了叙事的基本连贯性和观众的感受。\n这种形式大于内容的做法，让电影看起来更像是一部超长的音乐录影带而非电影。", sentiment: "Negative" },
    { text: "这是一个关于勇气与牺牲的史诗故事，其宏大的场面与悲壮的基调令人震撼。\n导演在处理战争场面时表现出了惊人的掌控力，既展现了残酷也体现了人性的光辉。\n演员们的表演极具张力，将那些在历史洪流中挣扎的小人物刻画得入木三分。\n这是一部能够激发民族自豪感和对和平向往的佳作，具有极高的艺术和思想价值。", sentiment: "Positive" },
    { text: "电影的幽默感非常高级，它通过冷幽默和讽刺对社会现状进行了辛辣的批判。\n剧本的对白充满了智慧，每一个笑点背后都隐藏着对现实的深刻观察和无奈。\n这种黑色幽默的风格虽然有一定的门槛，但对于喜欢思考的观众来说是极大的享受。\n它不只是一部让人发笑的喜剧，更是一面照向现实的镜子，让人在笑声中反思。", sentiment: "Positive" },
    { text: "电影的叙事节奏非常稳健，像是一条缓缓流淌的大河，带你领略人生的起伏。\n它不急于给出答案，而是让观众随着角色一起经历、一起成长、一起感悟。\n这种从容不迫的叙事态度在当今浮躁的电影环境下显得尤为珍贵，令人心生敬意。\n这是一部需要静下心来慢慢品味的作品，它会带给你一种持久而深沉的感动。", sentiment: "Positive" },
    { text: "电影的特效虽然华丽，但却缺乏想象力，看起来像是各种经典科幻片的缝合怪。\n这种缺乏原创性的设计让观众感到审美疲劳，很难对电影中的世界产生真正的兴趣。\n导演似乎认为只要堆砌足够多的视觉元素就能成功，却忽略了故事才是电影的灵魂。\n这种缺乏诚意的商业运作，最终只能产出一件毫无个性的工业流水线产品。", sentiment: "Negative" },
    { text: "这是一个关于秘密与背叛的故事，其错综复杂的人物关系让人看得目不暇接。\n导演通过精妙的剪辑和叙事结构，将真相隐藏在重重迷雾之后，直到最后一刻才揭晓。\n演员们的表演非常有层次感，每个人似乎都戴着面具，让人真假难辨。\n这是一部非常烧脑的悬疑佳作，它挑战了观众的逻辑思维能力，让人大呼过瘾。", sentiment: "Positive" },
    { text: "电影的基调非常压抑，它真实地展现了贫困和绝望是如何摧毁一个人的意志。\n导演没有进行任何美化，而是用一种近乎残酷的真实感将这些社会问题摆在观众面前。\n这种直面苦难的勇气令人敬佩，它唤起了人们对弱势群体的关注和同情。\n虽然观影过程并不愉快，但这种沉重感正是电影想要传达的力量，不容忽视。", sentiment: "Negative" },
    { text: "电影的配乐非常出彩，它不仅仅是背景音乐，更是电影叙事的重要组成部分。\n旋律在关键时刻能够极大地增强情感的表达，让观众的情绪随之起伏波动。\n这种音画合一的艺术境界，展现了导演和作曲家之间极高的默契和才华。\n即便脱离了画面，这些音乐依然具有独立的艺术价值，是一场听觉的宴会。", sentiment: "Positive" },
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
