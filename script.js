const intro = document.querySelector('#intro-screen');
const workspace = document.querySelector('#workspace');
const crumb = document.querySelector('#crumb');
const views = [...document.querySelectorAll('.view')];
const progressNav = document.querySelector('#progress-nav');
const routeOrder = ['home', 'about', 'experience', 'capabilities', 'life'];
const contactDetails = {
  phone: { value: '18925072412', success: '电话号码已复制' },
  email: { value: '18925072412@163.com', success: '邮箱已复制' }
};

async function copyContact(trigger, type) {
  const actionGroup = trigger.closest('.contact-actions');
  const status = actionGroup?.querySelector('.contact-actions__status');
  const label = trigger.querySelector('[data-action-label]');
  const originalLabel = label?.textContent || '复制';
  const detail = contactDetails[type];
  if (!detail) return;

  const copyWithFallback = () => {
    const textarea = document.createElement('textarea');
    textarea.value = detail.value;
    textarea.setAttribute('readonly', '');
    textarea.style.cssText = 'position:fixed;left:-9999px;opacity:0';
    document.body.append(textarea);
    textarea.select();
    const copied = document.execCommand('copy');
    textarea.remove();
    return copied;
  };

  try {
    let copied = false;
    if (navigator.clipboard && window.isSecureContext) {
      try {
        await navigator.clipboard.writeText(detail.value);
        copied = true;
      } catch (error) {
        copied = copyWithFallback();
      }
    }
    if (!copied) copied = copyWithFallback();
    if (!copied) throw new Error('copy failed');

    if (label) label.textContent = '已复制 ✓';
    if (status) status.textContent = detail.success;
  } catch (error) {
    if (label) label.textContent = '复制失败';
    if (status) status.textContent = `请手动复制：${detail.value}`;
  }

  window.setTimeout(() => {
    if (label) label.textContent = originalLabel;
    if (status) status.textContent = '';
  }, 2200);
}

function updateProgressNavigation(route) {
  if (!progressNav) return;
  const routeIndex = Math.max(0, routeOrder.indexOf(route));
  progressNav.style.setProperty('--progress-position', `${10 + (routeIndex * 20)}%`);
  progressNav.querySelectorAll('[data-route]').forEach(item => {
    const isActive = item.dataset.route === route;
    item.classList.toggle('is-active', isActive);
    item.toggleAttribute('aria-current', isActive);
  });
  progressNav.dataset.route = route;
}

const heroTags = [
  { label: '好奇', en: 'CURIOUS', description: '对陌生领域保持兴趣，愿意主动追问事情为什么发生。', size: 'large', tone: 'peach', x: 8, y: 13, rotate: -5, dx: 7, dy: -5, duration: 7.6 },
  { label: '结果导向', en: 'OUTCOME', description: '关注方案是否真正改变业务，而不只停在过程完成。', size: 'medium', tone: 'paper', x: 83, y: 13, rotate: 4, dx: -6, dy: 6, duration: 8.4 },
  { label: '执行力', en: 'EXECUTION', description: '把判断迅速转化为行动，持续追踪节点与最终交付。', size: 'medium', tone: 'sage', x: 40, y: 24, rotate: -2, dx: 5, dy: 6, duration: 9.1 },
  { label: '复盘与迭代', en: 'REFLECT & ITERATE', description: '从结果中识别偏差，用新信息持续校准下一步行动。', size: 'small', tone: 'blue', x: 94, y: 28, rotate: 5, dx: -6, dy: 4, duration: 8.2 },
  { label: '自我觉察', en: 'SELF AWARE', description: '看见自己的优势、局限与情绪，保持诚实的自我反馈。', size: 'small', tone: 'paper', x: 4, y: 31, rotate: 4, dx: 5, dy: -4, duration: 8.7 },
  { label: '敏锐', en: 'PERCEPTIVE', description: '从细微信号和变化中，快速捕捉真正值得关注的问题。', size: 'small', tone: 'peach', x: 5, y: 47, rotate: -5, dx: 5, dy: 5, duration: 9.4 },
  { label: '复杂问题简单化', en: 'SIMPLIFY COMPLEXITY', description: '找到关键矛盾，搭建清晰框架并拆成可执行路径。', size: 'medium', tone: 'sage', x: 92, y: 44, rotate: -3, dx: -5, dy: -6, duration: 8.1 },
  { label: '用户视角', en: 'USER CENTRIC', description: '从真实行为与使用场景出发，理解需求为什么发生。', size: 'small', tone: 'paper', x: 3, y: 63, rotate: 5, dx: 6, dy: -4, duration: 7.7 },
  { label: '数据驱动', en: 'DATA INFORMED', description: '用数据定位问题、验证假设，同时保留业务判断。', size: 'medium', tone: 'blue', x: 94, y: 60, rotate: 3, dx: -6, dy: 5, duration: 8.9 },
  { label: 'AI 工具', en: 'AI TOOLS', description: '主动使用大模型与智能工具，提升研究、分析和执行效率。', size: 'large', tone: 'ink', x: 6, y: 76, rotate: -4, dx: 5, dy: 5, duration: 9.2 },
  { label: '快速学习', en: 'FAST LEARNER', description: '面对新业务先搭框架、补信息，再快速进入问题现场。', size: 'small', tone: 'paper', x: 44, y: 73, rotate: 5, dx: 7, dy: -4, duration: 7.7 },
  { label: 'Owner 意识', en: 'OWNERSHIP', description: '主动补位、追踪结果，并对最终交付负责。', size: 'small', tone: 'sage', x: 88, y: 76, rotate: -5, dx: -5, dy: 4, duration: 8.9 },
  { label: '协同推动', en: 'ALIGN & SHIP', description: '在不同角色之间对齐目标、边界与交付标准。', size: 'small', tone: 'blue', x: 2, y: 91, rotate: 3, dx: -4, dy: -5, duration: 8.3 },
  { label: '高效沟通', en: 'COMMUNICATE', description: '抓住关键信息，用对方易理解的方式推动共识。', size: 'small', tone: 'peach', x: 30, y: 91, rotate: -3, dx: 5, dy: 3, duration: 9.5 },
  { label: '旅行', en: 'TRAVEL', description: '去陌生的地方，也换一个角度理解世界。', size: 'tiny', tone: 'paper', x: 58, y: 91, rotate: -4, dx: 5, dy: 3, duration: 9.5 },
  { label: '户外运动', en: 'OUTDOOR', description: '喜欢身体在动，也喜欢山野带来的自由感。', size: 'tiny', tone: 'sage', x: 80, y: 91, rotate: 6, dx: -5, dy: -4, duration: 7.8 },
  { label: '电影与展览', en: 'CULTURE', description: '在影像和展览里，看见不同的人与不同的世界。', size: 'tiny', tone: 'peach', x: 98, y: 87, rotate: 8, dx: -6, dy: 5, duration: 8.6 }
];

function renderHeroTagField() {
  const stage = document.querySelector('#tag-stage');
  const cloud = document.querySelector('#hero-tag-cloud');
  const detail = document.querySelector('#hero-tag-detail');
  if (!stage || !cloud || !detail) return;

  const detailContent = detail.querySelector('.hero-tag-detail__content');
  const defaultDetail = detailContent.innerHTML;
  const prefersReducedMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
  let activeTag = null;
  let pinnedTag = null;
  let detailTimer;

  cloud.innerHTML = heroTags.map((tag, index) => `
    <button class="hero-tag hero-tag--${tag.size} hero-tag--${tag.tone}" type="button" data-index="${index}" data-cursor="READ" aria-label="${tag.label}：${tag.description}" aria-pressed="false" style="--tag-x:${tag.x}%;--tag-y:${tag.y}%;--tag-rotate:${tag.rotate}deg;--drift-x:${tag.dx}px;--drift-y:${tag.dy}px;--drift-duration:${tag.duration}s;--drift-delay:${index * -.43}s">
      <span class="hero-tag__float"><span class="hero-tag__surface"><strong>${tag.label}</strong><small>${tag.en}</small></span></span>
    </button>`).join('');

  const tags = [...cloud.querySelectorAll('.hero-tag')];

  const resetRepulsion = () => tags.forEach(tag => {
    tag.style.setProperty('--repel-x', '0px');
    tag.style.setProperty('--repel-y', '0px');
  });

  const applyRepulsion = source => {
    if (prefersReducedMotion || innerWidth <= 720) return;
    const sourceRect = source.getBoundingClientRect();
    const sourceX = sourceRect.left + sourceRect.width / 2;
    const sourceY = sourceRect.top + sourceRect.height / 2;
    tags.forEach(tag => {
      if (tag === source) return;
      const rect = tag.getBoundingClientRect();
      const dx = rect.left + rect.width / 2 - sourceX;
      const dy = rect.top + rect.height / 2 - sourceY;
      const distance = Math.max(1, Math.hypot(dx, dy));
      const strength = Math.max(0, (190 - distance) / 190) * 18;
      tag.style.setProperty('--repel-x', `${(dx / distance) * strength}px`);
      tag.style.setProperty('--repel-y', `${(dy / distance) * strength}px`);
    });
  };

  const updateDetail = item => {
    window.clearTimeout(detailTimer);
    detail.classList.add('is-switching');
    detailTimer = window.setTimeout(() => {
      detailContent.innerHTML = item ? `<span>${item.en} · PERSONAL NOTE</span><strong>${item.label}</strong><p>${item.description}</p>` : defaultDetail;
      detail.classList.toggle('has-active-tag', Boolean(item));
      detail.classList.remove('is-switching');
    }, 90);
  };

  const activateTag = tag => {
    if (activeTag === tag) return;
    activeTag?.classList.remove('is-active');
    activeTag = tag;
    tag.classList.add('is-active');
    stage.classList.add('has-active-tag');
    applyRepulsion(tag);
    updateDetail(heroTags[Number(tag.dataset.index)]);
  };

  const clearActiveTag = () => {
    if (pinnedTag) return;
    activeTag?.classList.remove('is-active');
    activeTag = null;
    stage.classList.remove('has-active-tag');
    resetRepulsion();
    updateDetail(null);
  };

  tags.forEach(tag => {
    tag.addEventListener('pointerenter', () => activateTag(tag));
    tag.addEventListener('pointerleave', clearActiveTag);
    tag.addEventListener('focus', () => activateTag(tag));
    tag.addEventListener('blur', clearActiveTag);
    tag.addEventListener('click', event => {
      event.stopPropagation();
      if (pinnedTag === tag) {
        tag.classList.remove('is-pinned');
        tag.setAttribute('aria-pressed', 'false');
        pinnedTag = null;
        clearActiveTag();
        return;
      }
      pinnedTag?.classList.remove('is-pinned');
      pinnedTag?.setAttribute('aria-pressed', 'false');
      pinnedTag = tag;
      tag.classList.add('is-pinned');
      tag.setAttribute('aria-pressed', 'true');
      activateTag(tag);
    });
  });

  stage.addEventListener('click', event => {
    if (event.target.closest('.hero-tag')) return;
    pinnedTag?.classList.remove('is-pinned');
    pinnedTag?.setAttribute('aria-pressed', 'false');
    pinnedTag = null;
    clearActiveTag();
  });
}

const experienceData = [
  {
    company: 'Shopee', role: '战略分析', keywords: '跨境电商 · 市场研究 · 竞对分析',
    period: '2024.08–2024.12', timeline: '2024', photo: 'assets/experience-01-shopee.jpg', photoPosition: '50% 54%',
    workedOn: '参与跨境电商行业、重点市场及主要竞对研究，为管理层业务判断提供信息输入。',
    did: [
      '建设并维护跨境行业数据库，交叉验证公开资料、数据库及行业信息',
      '持续追踪竞对动态，拆解其业务模式、市场布局与增长逻辑',
      '围绕拉美市场及业务重点问题，产出英文年度研究与专题报告'
    ],
    impact: ['完成拉美市场年度研究、英文市场报告及多份专题洞察', '为团队年度规划和业务研判提供依据']
  },
  {
    company: '美团', role: '商业分析', keywords: '经营分析 · 用户研究 · 数据体系',
    period: '2025.03–2025.07', timeline: '2025', photo: 'assets/experience-02-meituan-ba.jpg', photoPosition: '50% 54%',
    workedOn: '参与大众点评经营分析与经营规划。重点研究流量侧的变动问题。',
    did: [
      '使用 SQL 拆解流量、用户结构及行为路径，定期归因核心指标变动',
      '结合用户调研与竞品研究，梳理找店、看攻略、做记录三类旅游需求',
      '维护并迭代核心经营看板，统一指标口径并持续开展异动解读'
    ],
    impact: ['定位旅游需求变化、平台心智减弱及需求流向竞品等主要原因', '形成搜索引导、内容供给与指标体系优化建议']
  },
  {
    company: '字节跳动', role: '增长策略产品经理', keywords: '用户激励 · 留存优化 · ROI',
    period: '2025.08–2025.11', timeline: '2025', photo: 'assets/experience-03-bytedance-growth.jpg', photoPosition: '50% 55%',
    workedOn: '参与抖音系某 App 的用户激励增长，覆盖促活、签到与裂变渠道。',
    did: [
      '针对低登录率，将核心促活玩法向未登录用户外显，并改造激励数值策略',
      '通过数据分析定位签到次日断签问题，推动签到周期与奖励策略迭代',
      '拆解裂变渠道成本收益，预测不同出价下的 ROI、CPA 与量级并上线实验'
    ],
    impact: ['LT30 +1%', 'DAU +4w', '登录率 +1pp', '裂变 ROI +75%']
  },
  {
    company: '美团', role: '商业化策略产品经理', keywords: '广告产品 · 供给策略 · 收入增长',
    period: '2025.11–2026.02', timeline: '2025–26', photo: 'assets/experience-04-meituan-monetization.jpg', photoPosition: '50% 55%',
    workedOn: '参与到店广告产品优化，覆盖创意供给、商家购买量、广告过滤与收入监控。',
    did: [
      '拓展广告素材库，在 B、C 两端接入算法优选，实现请求粒度的个性化头图',
      '将固定购买量档位改为动态建议值，引导商家提高购买量',
      '根据行业履约率动态调整广告过滤门槛，平衡广告效果与用户体验',
      '监控广告收入并归因异动，排查线上 Case、推动解决方案上线'
    ],
    impact: ['广告 CTR +1pp', '商家购买量 +5%', '广告收入 +1w/day', '产品履约率 +2pp']
  },
  {
    company: '字节跳动', role: '广告产品经理', keywords: '投放系统 · 竞价策略 · AI Agent',
    period: '2026.04–2026.06', timeline: '2026', photo: 'assets/experience-05-bytedance-ads.jpg', photoPosition: '50% 51%',
    workedOn: '参与短剧行业广告投放系统与竞价策略优化，兼顾商家投放效果和平台收益。',
    did: [
      '梳理投放策略的触发条件、优先级与执行链路，定位策略冗余及新建失败问题',
      '设计自动化排障 Agent，串联素材状态与策略命中信息，输出失败归因和处理建议',
      '结合策略占比、ARPU 与新建结果，取消低效策略并优化不同生命周期剧目的供给分配',
      '分析竞价公式参数对行业及平台收益的影响，推动参数调优并持续监控上线表现'
    ],
    impact: ['排障工具覆盖团队 10+ 人', '新剧供给 +25%', '减少低效策略与老剧冗余供给']
  }
];

function renderExperienceCarousel() {
  const carousel = document.querySelector('#experience-carousel');
  const track = document.querySelector('#experience-card-track');
  const timelineNodes = document.querySelector('#experience-timeline-nodes');
  const prevButton = document.querySelector('#experience-prev');
  const nextButton = document.querySelector('#experience-next');
  if (!carousel || !track || !timelineNodes || !prevButton || !nextButton) return;

  let activeIndex = 0;
  let hoverTargetIndex = null;
  let flippedIndex = null;
  let isDragging = false;
  let isTransitioning = false;
  let hoverSwitchTimer;
  let autoFlipTimer;
  let transitionTimer;
  let dragStartX = 0;
  let dragX = 0;
  let pointerDownCardIndex = null;
  let suppressCardClick = false;
  let wheelTotal = 0;
  let wheelLocked = false;
  let hoverNavigationLocked = false;
  let hoverLockX = 0;
  let hoverLockY = 0;
  let lastPointerX = 0;
  let lastPointerY = 0;
  const cards = [];
  const nodes = [];
  const timelineY = ['88%', '36%', '19%', '36%', '88%'];
  const HOVER_UNLOCK_DISTANCE = 20;

  const renderExperienceList = (items, modifier = '') => `<ul class="experience-back-list ${modifier}">${items.map(item => `<li>${item}</li>`).join('')}</ul>`;

  const cardTemplate = (item, index) => `
    <article class="experience-card" data-index="${index}" aria-label="${item.company} ${item.role}">
      <div class="experience-card-inner">
        <section class="experience-card-face experience-card-front">
          <div class="experience-card-photo"><img src="${item.photo}" alt="${item.company} 经历照片" style="object-position:${item.photoPosition}"></div>
          <div class="experience-card-front-info">
            <div class="experience-card-meta"><p class="experience-card-no">0${index + 1} / 05</p><p class="experience-card-period">${item.period}</p></div>
            <div class="experience-card-front-main">
            <h2 class="experience-card-company">${item.company}</h2>
            <p class="experience-card-role">${item.role}</p>
            </div>
            <p class="experience-card-keywords">${item.keywords}</p>
          </div>
        </section>
        <section class="experience-card-face experience-card-back">
          <header class="experience-back-head"><h2>${item.company}</h2><p>${item.role}</p></header>
          <div class="experience-back-body">
            <section class="experience-back-section"><h3>WHAT I WORKED ON</h3><p>${item.workedOn}</p></section>
            <section class="experience-back-section"><h3>WHAT I DID</h3>${renderExperienceList(item.did)}</section>
            <section class="experience-back-section experience-back-section--impact"><h3>IMPACT</h3>${renderExperienceList(item.impact, 'experience-back-list--impact')}</section>
          </div>
        </section>
      </div>
    </article>`;

  track.innerHTML = experienceData.map(cardTemplate).join('');
  timelineNodes.innerHTML = experienceData.map((item, index) => `<button class="experience-timeline-node" type="button" data-index="${index}" style="--node-x:${index * 25}%;--node-y:${timelineY[index]}" aria-label="查看 ${item.company} ${item.period}">${item.timeline}</button>`).join('');
  cards.push(...track.querySelectorAll('.experience-card'));
  nodes.push(...timelineNodes.querySelectorAll('.experience-timeline-node'));

  const cancelHoverSwitch = () => {
    window.clearTimeout(hoverSwitchTimer);
    hoverSwitchTimer = undefined;
    hoverTargetIndex = null;
  };

  const cancelAutoFlip = () => {
    window.clearTimeout(autoFlipTimer);
    autoFlipTimer = undefined;
  };

  const lockHoverNavigation = () => {
    hoverNavigationLocked = true;
    hoverLockX = lastPointerX;
    hoverLockY = lastPointerY;
  };

  const unlockHoverNavigation = () => {
    hoverNavigationLocked = false;
  };

  const resetFlip = () => {
    cancelAutoFlip();
    flippedIndex = null;
    cards.forEach(card => card.classList.remove('is-flipped'));
  };

  const updateVisualState = () => {
    const step = Math.min(Math.max(carousel.clientWidth * .205, 228), 272);
    cards.forEach((card, index) => {
      const offset = index - activeIndex;
      const distance = Math.abs(offset);
      const scale = Math.max(.69, 1 - distance * .075);
      const opacity = Math.max(.12, 1 - distance * .17);
      card.style.setProperty('--card-x', `${offset * step}px`);
      card.style.setProperty('--card-y', `${Math.min(46, distance * distance * 7)}px`);
      card.style.setProperty('--card-rotate', `${offset * 3.4}deg`);
      card.style.setProperty('--card-scale', scale.toFixed(3));
      card.style.setProperty('--card-opacity', opacity.toFixed(3));
      card.style.setProperty('--card-z', `${20 - distance}`);
      card.classList.toggle('is-active', index === activeIndex);
    });
    nodes.forEach((node, index) => node.classList.toggle('is-active', index === activeIndex));
    prevButton.disabled = activeIndex === 0;
    nextButton.disabled = activeIndex === experienceData.length - 1;
  };

  const scheduleAutoFlip = (index, delay = 500) => {
    cancelAutoFlip();
    if (matchMedia('(prefers-reduced-motion: reduce)').matches || index !== activeIndex || isDragging || isTransitioning) return;
    autoFlipTimer = window.setTimeout(() => {
      if (index !== activeIndex || isDragging || isTransitioning) return;
      resetFlip();
      flippedIndex = index;
      cards[index].classList.add('is-flipped');
    }, delay);
  };

  const scheduleHoverSwitch = index => {
    cancelHoverSwitch();
    if (!matchMedia('(hover: hover)').matches || hoverNavigationLocked || index === activeIndex || isDragging) return;
    hoverTargetIndex = index;
    hoverSwitchTimer = window.setTimeout(() => {
      if (hoverTargetIndex === index && !isDragging && !hoverNavigationLocked) goToCard(index, false, 500, true);
    }, 500);
  };

  const goToCard = (requestedIndex, alreadyCentered = false, autoFlipDelay = 500, lockHover = false) => {
    const nextIndex = Math.max(0, Math.min(experienceData.length - 1, requestedIndex));
    cancelHoverSwitch();
    cancelAutoFlip();
    resetFlip();
    if (lockHover) lockHoverNavigation();
    activeIndex = nextIndex;
    isTransitioning = true;
    updateVisualState();
    window.clearTimeout(transitionTimer);
    if (alreadyCentered) {
      isTransitioning = false;
      scheduleAutoFlip(activeIndex, autoFlipDelay);
      return;
    }
    transitionTimer = window.setTimeout(() => {
      isTransitioning = false;
      scheduleAutoFlip(activeIndex, autoFlipDelay);
    }, 610);
  };

  const toggleActiveCard = () => {
    if (isDragging || isTransitioning) return;
    cancelAutoFlip();
    if (flippedIndex === activeIndex) {
      cards[activeIndex].classList.remove('is-flipped');
      flippedIndex = null;
      return;
    }
    resetFlip();
    flippedIndex = activeIndex;
    cards[activeIndex].classList.add('is-flipped');
  };

  cards.forEach((card, index) => {
    card.tabIndex = 0;
    card.setAttribute('role', 'button');
    card.setAttribute('aria-label', `${experienceData[index].company} ${experienceData[index].role}，按回车查看详情`);
    card.addEventListener('pointerenter', event => {
      lastPointerX = event.clientX;
      lastPointerY = event.clientY;
      if (isDragging) return;
      if (index !== activeIndex) scheduleHoverSwitch(index);
    });
    card.addEventListener('pointerleave', () => {
      if (hoverTargetIndex !== index) return;
      cancelHoverSwitch();
      hoverTargetIndex = null;
    });
    card.addEventListener('click', () => {
      if (suppressCardClick || isDragging || isTransitioning) return;
      if (index !== activeIndex) goToCard(index, false, 500, true);
      else toggleActiveCard();
    });
    card.addEventListener('keydown', event => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        if (index !== activeIndex) goToCard(index);
        else toggleActiveCard();
      }
      if (event.key === 'ArrowLeft') goToCard(activeIndex - 1);
      if (event.key === 'ArrowRight') goToCard(activeIndex + 1);
    });
  });

  nodes.forEach((node, index) => node.addEventListener('click', () => goToCard(index)));
  prevButton.addEventListener('click', () => goToCard(activeIndex - 1));
  nextButton.addEventListener('click', () => goToCard(activeIndex + 1));

  carousel.addEventListener('pointerdown', event => {
    if (event.button !== undefined && event.button !== 0) return;
    cancelHoverSwitch();
    cancelAutoFlip();
    const pressedCard = event.target.closest('.experience-card');
    pointerDownCardIndex = pressedCard ? Number(pressedCard.dataset.index) : null;
    isDragging = true;
    dragStartX = event.clientX;
    dragX = 0;
    carousel.classList.add('is-dragging');
    carousel.setPointerCapture?.(event.pointerId);
  });
  carousel.addEventListener('pointermove', event => {
    lastPointerX = event.clientX;
    lastPointerY = event.clientY;
    if (hoverNavigationLocked && !isDragging && !isTransitioning) {
      const movedX = lastPointerX - hoverLockX;
      const movedY = lastPointerY - hoverLockY;
      if (Math.hypot(movedX, movedY) >= HOVER_UNLOCK_DISTANCE) {
        unlockHoverNavigation();
        const hoveredCard = event.target.closest('.experience-card');
        const hoveredIndex = hoveredCard ? Number(hoveredCard.dataset.index) : -1;
        if (hoveredIndex >= 0 && hoveredIndex !== activeIndex) scheduleHoverSwitch(hoveredIndex);
      }
    }
    if (!isDragging) return;
    dragX = Math.max(-110, Math.min(110, event.clientX - dragStartX));
    track.style.setProperty('--drag-x', `${dragX}px`);
  });
  const endDrag = event => {
    if (!isDragging) return;
    const travel = Math.abs(dragX);
    const pressedIndex = pointerDownCardIndex;
    carousel.releasePointerCapture?.(event.pointerId);
    isDragging = false;
    carousel.classList.remove('is-dragging');
    track.style.setProperty('--drag-x', '0px');
    if (travel >= 52) {
      suppressCardClick = true;
      goToCard(activeIndex + (dragX < 0 ? 1 : -1), false, 500, true);
      window.setTimeout(() => { suppressCardClick = false; }, 0);
    } else if (travel <= 9 && pressedIndex !== null) {
      suppressCardClick = true;
      if (pressedIndex === activeIndex) toggleActiveCard();
      else goToCard(pressedIndex, false, 500, true);
      window.setTimeout(() => { suppressCardClick = false; }, 0);
    } else updateVisualState();
    dragX = 0;
    pointerDownCardIndex = null;
  };
  carousel.addEventListener('pointerup', endDrag);
  carousel.addEventListener('pointercancel', endDrag);
  carousel.addEventListener('pointerleave', () => {
    cancelHoverSwitch();
    unlockHoverNavigation();
  });
  carousel.addEventListener('wheel', event => {
    if (Math.abs(event.deltaX) <= Math.abs(event.deltaY) || Math.abs(event.deltaX) < 10) return;
    event.preventDefault();
    if (wheelLocked) return;
    wheelTotal += event.deltaX;
    if (Math.abs(wheelTotal) < 54) return;
    goToCard(activeIndex + (wheelTotal > 0 ? 1 : -1), false, 500, true);
    wheelTotal = 0;
    wheelLocked = true;
    window.setTimeout(() => { wheelLocked = false; }, 580);
  }, { passive: false });

  window.addEventListener('resize', updateVisualState, { passive: true });
  updateVisualState();
  window.activateExperienceCarousel = () => {
    unlockHoverNavigation();
    goToCard(0, true, 1200);
    requestAnimationFrame(() => requestAnimationFrame(() => {
      if (activeIndex === 0 && !isDragging && !isTransitioning) scheduleAutoFlip(0, 1200);
    }));
  };
}

function setRouteHash(id, replace = false) {
  const nextUrl = id === 'home' ? location.pathname : `#${id}`;
  if (replace) history.replaceState({ route: id }, '', nextUrl);
  else if (location.hash !== (id === 'home' ? '' : `#${id}`)) history.pushState({ route: id }, '', nextUrl);
}

function setupCapabilityGuidance() {
  const puzzle = document.querySelector('.capability-map');
  if (!puzzle) return;
  const pieces = [...puzzle.querySelectorAll('.capability-piece')];
  const firstPiece = pieces[0];
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
  let guidancePlayed = false;
  let guidanceCancelled = false;
  let openTimer;
  let closeTimer;

  const closeGuidance = () => {
    window.clearTimeout(openTimer);
    window.clearTimeout(closeTimer);
    firstPiece?.classList.remove('is-guided');
  };

  const cancelGuidance = () => {
    guidanceCancelled = true;
    closeGuidance();
  };

  puzzle.addEventListener('pointerenter', cancelGuidance, { once: true });

  pieces.forEach(piece => {
    piece.addEventListener('click', event => {
      if (matchMedia('(hover:hover) and (pointer:fine)').matches) return;
      const willOpen = !piece.classList.contains('is-open');
      pieces.forEach(item => item.classList.remove('is-open'));
      piece.classList.toggle('is-open', willOpen);
      event.stopPropagation();
    });
    piece.addEventListener('keydown', event => {
      if (!['Enter', ' '].includes(event.key)) return;
      event.preventDefault();
      piece.click();
    });
  });

  document.addEventListener('click', event => {
    if (event.target.closest('.capability-piece')) return;
    pieces.forEach(piece => piece.classList.remove('is-open'));
  });

  window.activateCapabilityGuidance = () => {
    if (guidancePlayed || guidanceCancelled || reducedMotion || !matchMedia('(hover:hover) and (pointer:fine)').matches) return;
    guidancePlayed = true;
    closeGuidance();
    openTimer = window.setTimeout(() => {
      if (guidanceCancelled) return;
      firstPiece?.classList.add('is-guided');
      closeTimer = window.setTimeout(() => firstPiece?.classList.remove('is-guided'), 1200);
    }, 600);
  };
}

function showView(id, options = {}) {
  if (id === 'home') return goHome();
  const target = document.getElementById(id);
  if (!target) return;
  views.forEach(view => view.classList.toggle('active', view === target));
  if (crumb) crumb.textContent = target.dataset.title;
  workspace.classList.add('detail-open');
  updateProgressNavigation(id);
  if (id === 'experience') window.activateExperienceCarousel?.();
  if (id === 'capabilities') window.activateCapabilityGuidance?.();
  setRouteHash(id, options.replaceHistory);
}

function openPage(id, options = {}) {
  intro.classList.add('leaving');
  window.setTimeout(() => {
    intro.hidden = true;
    workspace.classList.add('visible');
    workspace.setAttribute('aria-hidden', 'false');
    showView(id, options);
  }, 420);
}

function goHome(options = {}) {
  workspace.classList.remove('visible', 'detail-open');
  workspace.setAttribute('aria-hidden', 'true');
  intro.hidden = false;
  updateProgressNavigation('home');
  requestAnimationFrame(() => intro.classList.remove('leaving'));
  setRouteHash('home', options.replaceHistory);
}

window.showView = showView;
window.openPage = openPage;
window.goHome = goHome;

const introSegments = [
  { text: 'hi，我是李玥霖，\n来自', accent: false },
  { text: '上海财经大学', accent: true },
  { text: '的2027届毕业生。\n\n我对复杂的', accent: false },
  { text: '商业问题', accent: true },
  { text: '很好奇，\n也喜欢把问题想清楚，\n把答案真正做成', accent: false },
  { text: '产品', accent: true },
  { text: '。', accent: false }
];

function renderTypedIntro(characterCount) {
  const target = document.querySelector('#type-intro');
  const cursor = document.querySelector('#intro-cursor');
  target.replaceChildren();
  let remaining = characterCount;
  introSegments.forEach(segment => {
    if (remaining <= 0) return;
    const content = segment.text.slice(0, remaining);
    if (!content) return;
    const span = document.createElement('span');
    if (segment.accent) span.className = 'intro-accent';
    span.textContent = content;
    target.append(span);
    remaining -= content.length;
  });
  target.append(cursor);
}

function typeIntroOnce() {
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const fullText = introSegments.map(segment => segment.text).join('');
  const cursor = document.querySelector('#intro-cursor');
  if (reducedMotion) {
    renderTypedIntro(fullText.length);
    cursor.hidden = true;
    return;
  }
  let index = 0;
  const tick = () => {
    index += 1;
    renderTypedIntro(index);
    if (index >= fullText.length) {
      cursor.classList.add('is-complete');
      window.setTimeout(() => { cursor.hidden = true; }, 1650);
      return;
    }
    const char = fullText[index - 1];
    const pause = char === '，' ? 145 : char === '。' ? 290 : char === '\n' ? 230 : 68 + (index % 4) * 6;
    window.setTimeout(tick, pause);
  };
  window.setTimeout(tick, 520);
}

function enableCustomCursor() {
  if (matchMedia('(prefers-reduced-motion: reduce)').matches || !matchMedia('(pointer:fine)').matches) return;
  const cursor = document.querySelector('.site-cursor');
  const label = cursor.querySelector('.site-cursor__label');
  let pointer = { x: innerWidth / 2, y: innerHeight / 2 };
  let ring = { ...pointer };
  document.addEventListener('pointermove', event => {
    pointer.x = event.clientX;
    pointer.y = event.clientY;
    cursor.classList.add('is-visible');
  }, { passive: true });
  document.addEventListener('pointerover', event => {
    const target = event.target.closest('[data-cursor], button, a');
    if (!target) return;
    const action = target.dataset.cursor || 'OPEN';
    label.textContent = action;
    cursor.classList.add('is-active');
    cursor.classList.toggle('is-viewing', action === 'VIEW');
  });
  document.addEventListener('pointerout', event => {
    if (event.relatedTarget?.closest?.('[data-cursor], button, a')) return;
    cursor.classList.remove('is-active');
    cursor.classList.remove('is-viewing');
    label.textContent = '';
  });
  const frame = () => {
    const follow = intro.hidden ? .16 : .25;
    ring.x += (pointer.x - ring.x) * follow;
    ring.y += (pointer.y - ring.y) * follow;
    cursor.style.setProperty('--pointer-x', `${pointer.x}px`);
    cursor.style.setProperty('--pointer-y', `${pointer.y}px`);
    cursor.style.setProperty('--ring-x', `${ring.x}px`);
    cursor.style.setProperty('--ring-y', `${ring.y}px`);
    requestAnimationFrame(frame);
  };
  requestAnimationFrame(frame);
}

renderHeroTagField();
renderExperienceCarousel();
setupCapabilityGuidance();
typeIntroOnce();
enableCustomCursor();

const initialRoute = location.hash.slice(1);
updateProgressNavigation(routeOrder.includes(initialRoute) ? initialRoute : 'home');
if (['about', 'experience', 'capabilities', 'life'].includes(initialRoute)) openPage(initialRoute, { replaceHistory: true });

window.addEventListener('popstate', () => {
  const route = location.hash.slice(1);
  if (['about', 'experience', 'capabilities', 'life'].includes(route)) {
    if (intro.hidden) showView(route, { replaceHistory: true });
    else openPage(route, { replaceHistory: true });
  } else {
    goHome({ replaceHistory: true });
  }
});
