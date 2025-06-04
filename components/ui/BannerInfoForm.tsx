import React, { useState } from "react";
import TextInput from "./TextInput";
import Dropdown from "./Dropdown";
import MultiSelectDropdown from "./MultiSelectDropdown";

interface BannerFormData {
  company_name: string;
  category: string;
  taste: string;
  shape: string;
  media: string;
}

interface BannerInfoFormProps {
  onSubmit: (data: BannerFormData) => void;
}

const BannerInfoForm: React.FC<BannerInfoFormProps> = ({ onSubmit }) => {
  const [company, setCompany] = useState("");
  const [category, setCategory] = useState<string[]>([]);
  const [taste, setTaste] = useState<string[]>([]);
  const [shape, setShape] = useState<string[]>([]);
  const [media, setMedia] = useState<string[]>([]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const data = {
      company_name: company,
      category: category.join(","),
      taste: taste.join(","),
      shape: shape.join(","),
      media: media.join(","),
    };

    onSubmit(data);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="pr-15 pb-7 border-r-1 border-gray-800">
      <table>
        <tbody>
          <TextInput
            label="COMPANY"
            value={company}
            onChange={setCompany}
            placeholder="会社名を入力"
          />
          <Dropdown
            label="CATEGORY"
            value={category}
            onChange={(value) => setCategory(value)}
            options={[
              { label: "ファッション", value: "ファッション" },
              { label: "テクノロジー", value: "テクノロジー" },
              { label: "スポーツ", value: "スポーツ" },
              { label: "飲食・グルメ", value: "飲食・グルメ" },
              { label: "美容・コスメ", value: "美容・コスメ" },
              { label: "旅行・観光", value: "旅行・観光" },
              { label: "教育・学習", value: "教育・学習" },
              { label: "エンタメ", value: "エンタメ" },
              { label: "ライフスタイル", value: "ライフスタイル" },
              { label: "金融・保険", value: "金融・保険" },
            ]}
          />
          <MultiSelectDropdown
            label="TASTE"
            options={[
              { label: "かわいい", value: "かわいい" },
              { label: "かっこいい", value: "かっこいい" },
              { label: "高級感", value: "高級感" },
              { label: "ポップ", value: "ポップ" },
              { label: "ミニマル", value: "ミニマル" },
              { label: "レトロ", value: "レトロ" },
              { label: "ナチュラル", value: "ナチュラル" },
              { label: "エレガント", value: "エレガント" },
              { label: "シンプル", value: "シンプル" },
              { label: "シズル感", value: "シズル感" },
            ]}
            selectedValues={taste}
            onChange={setTaste}
          />
          <Dropdown
            label="SHAPE"
            value={shape}
            onChange={(value) => setShape(value)}
            options={[
              { label: "正方形", value: "正方形" },
              { label: "縦長", value: "縦長" },
              { label: "横長", value: "横長" },
            ]}
          />
          <Dropdown
            label="MEDIA"
            value={media}
            onChange={(value) => setMedia(value)}
            options={[
              { label: "Instagram", value: "Instagram" },
              { label: "X", value: "X" },
              { label: "LINE", value: "LINE" },
            ]}
          />
        </tbody>
      </table>
      <div className="flex justify-center items-center mt-10">
        <button
          type="submit"
          className="px-10 py-8 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-300 ease-in-out">
          バナーを登録
        </button>
      </div>
    </form>
  );
};

export default BannerInfoForm;
