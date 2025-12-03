from typing import Annotated
from fastmcp import FastMCP
from tkinter import simpledialog
import json
import os


mcp = FastMCP("Fate-Another-Pretender-MCP")


def load_skill_data(filename):
    try:
        current_dir = os.path.dirname(os.path.abspath(__file__))
        file_path = os.path.join(current_dir, filename)
        with open(file_path, 'r', encoding='utf-8') as f:
            return json.load(f)
    except Exception as e:
        return {}


CLASS_SKILLS_DATA = load_skill_data("class_skill_description.json")
PERSONAL_SKILLS_DATA = load_skill_data("personal_skill_description.json")


def get_skill_info(
        data,
        skill_name: str,
        skill_level: int
) -> str:
    target_skill = data.get(skill_name)

    if not target_skill:
        for _, value in data.items():
            if skill_name in value.get("label", ""):
                target_skill = value
                break

    if not target_skill:
        return None

    label = target_skill.get("label", "未知技能")
    description = target_skill.get("description", "无描述")
    ranks = target_skill.get("ranks", [])

    if skill_level < 0:
        return f"技能 {label}: {description}\n - 错误: 等级 EX (-1) 的技能无等级相关描述，请检查从者档案中是否已经给出了描述。"

    if skill_level > 4:
        return f"技能 {label}: {description}\n - 错误：给定的等级 {skill_level} 不是 0-4 之间的整数 (0 = A, 4 = E)。"

    rank_chars = ["A", "B", "C", "D", "E"]

    rank_desc = ""
    for i in range(skill_level, len(ranks)):
        rank_char = rank_chars[i]
        rank_info = ranks[i] if i < len(ranks) else ""
        rank_desc += f" - {rank_char} 级: {rank_info}\n"

    return f"技能 {label}: {description}\n{rank_desc.strip()}"


@mcp.tool(
    name = "trail_by_ordeal",
    title = "神明裁决",
    description = "当遇到无法自行判断的状况时，向一个高等存在提问并获取答案。\n" +
                  "每次请求此工具时，请确保问题简洁明了，可以被简短地回答。\n" +
                  "如果一个问题包含多个子问题，请尝试将其拆分。\n" +
                  "祂的判断是绝对正确的。但祂很忙，所以请不要滥用这一功能。",
    annotations={"readOnlyHint": True, "openWorldHint": False}
)
def trail_by_ordeal(
    question: Annotated[str, "要询问祂的问题"]
) -> str:
    return simpledialog.askstring("人在回路 / 神明裁决", question) or "祂没有回答你，你只得自己寻求答案。"


@mcp.tool(
    name = "class_skill_description",
    title = "查询标准职阶技能的描述",
    description = "查询指定的职阶技能描述信息。描述中包含技能的一般效果，以及给定具体等级时的效果。\n" +
                  "除非另有说明，高等级的技能通常继承了低等级技能的效果。因此，当查询高等级的效果时，低等级的效果也会一并列出以供参考。\n" +
                  "注意：如果从者档案中已经给出了某个技能的描述信息，请优先参考从者档案中的描述，不要使用此工具；尝试查询非标准的职阶技能（uniqueClassSkills）将不会得到正确结果。此外，查询等级为 EX (-1) 的技能也不会得到正确结果。",
    annotations={"readOnlyHint": True, "openWorldHint": False}
)
def class_skill_description(
    skill_id_or_name: Annotated[str, "职阶技能的 ID 或名称"],
    skill_level: Annotated[int, "技能等级，0-4 之间的整数，0 表示 A 级，4 表示 E 级"]
) -> str:
    ret = get_skill_info(CLASS_SKILLS_DATA, skill_id_or_name, skill_level)
    if ret is not None:
        return ret

    ret = get_skill_info(PERSONAL_SKILLS_DATA, skill_id_or_name, skill_level)
    if ret is not None:
        return f"注意：查询到技能 '{skill_id_or_name}' 实际上是一个保有技能，而非职阶技能。\n\n" + ret

    return f"未找到名为 '{skill_id_or_name}' 的职阶技能。"



@mcp.tool(
    name = "personal_skill_description",
    title = "查询标准保有技能的描述",
    description = "查询指定的保有技能描述信息。描述中包含技能的一般效果，以及给定具体等级时的效果。\n" +
                  "除非另有说明，高等级的技能通常继承了低等级技能的效果。因此，当查询高等级的效果时，低等级的效果也会一并列出以供参考。\n" +
                  "注意：如果从者档案中已经给出了某个技能的描述信息，请优先参考从者档案中的描述，不要使用此工具；尝试查询非标准的保有技能（uniquePersonalSkills）将不会得到正确结果。此外，查询等级为 EX (-1) 的技能也不会得到正确结果。",
    annotations={"readOnlyHint": True, "openWorldHint": False}
)
def personal_skill_description(
    skill_id_or_name: Annotated[str, "保有技能的 ID 或名称"],
    skill_level: Annotated[int, "技能等级，0-4 之间的整数，0 表示 A 级，4 表示 E 级"]
) -> str:
    ret = get_skill_info(PERSONAL_SKILLS_DATA, skill_id_or_name, skill_level)
    if ret is not None:
        return ret

    ret = get_skill_info(CLASS_SKILLS_DATA, skill_id_or_name, skill_level)
    if ret is not None:
        return f"注意：查询到技能 '{skill_id_or_name}' 实际上是一个职阶技能，而非保有技能。\n\n" + ret

    return f"未找到名为 '{skill_id_or_name}' 的保有技能。"


if __name__ == "__main__":
    mcp.run(transport="streamable-http")
